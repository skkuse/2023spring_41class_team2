import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Chatbox from '../components/Chatbox';
import { commonAxios } from '../utils/commonAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../utils/UserProvider';

const ProblemPage: React.FC = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [code, setCode] = useState('');
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const { problemid } = useParams<{ problemid: string }>();
    const { userid } = useContext(UserContext);

    const validateSubmission = async () => {
        if (userAnswer === answer) {
            const data = {
                submittedValue: userAnswer,
            };

            commonAxios
                .post(`/users/${userid}/solved/${problemid}`, data)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success('Correct Answer! Back to main page.');
                        setTimeout(() => {
                            navigate('/main');
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error('Wrong Answer!');
        }
    };

    const handleQuestionClick = (questionContent: string) => {
        setSelectedQuestion(questionContent);
    };

    const getProblemData = () => {
        commonAxios
            .get(`/problems/${problemid}`)
            .then((res) => {
                if (res.status === 200) {
                    const decoder = new TextDecoder('utf-8');
                    const contentBuffer = new Uint8Array(res.data.content.data);
                    const content = decoder.decode(contentBuffer);

                    const codeBuffer = new Uint8Array(res.data.code.data);
                    const code = decoder.decode(codeBuffer);
                    setContent(content);
                    setCode(code);
                    setAnswer(res.data.answer);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        commonAxios
            .get(`/problems/${problemid}/questions`)
            .then((res) => {
                if (res.status === 200) {
                    setQuestions(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProblemData();
    }, []);

    useEffect(() => {
        getProblemData();
    }, [problemid]);

    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <Card className="p-4" style={{ minWidth: '200px' }}>
                            <Row>
                                <Col xs={8} className="mt-4">
                                    <b className="fs-2">Problem Description</b>
                                    <div>{content}</div>
                                    <CodeEditor
                                        value={code}
                                        language="c"
                                        placeholder="Type"
                                        padding={15}
                                        style={{
                                            fontSize: 14,
                                            backgroundColor: '#fafafa',
                                            fontFamily:
                                                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        }}
                                    />
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                value={userAnswer}
                                                onChange={(e: any) =>
                                                    setUserAnswer(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                style={{
                                                    width: '100%',
                                                    minWidth: '130px',
                                                    marginBottom: '10px',
                                                }}
                                                placeholder="Type your answer"
                                            ></Form.Control>
                                        </Col>
                                        <Col>
                                            <Button
                                                onClick={validateSubmission}
                                                variant="secondary"
                                                style={{
                                                    width: '100%',
                                                    minWidth: '50px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                    <b>Recommended Questions</b>
                                    {questions.map((question: any) => {
                                        return (
                                            <Button
                                                key={question.id}
                                                variant="light"
                                                style={{
                                                    width: '100%',
                                                    minWidth: '50px',
                                                    marginBottom: '10px',
                                                }}
                                                onClick={() =>
                                                    handleQuestionClick(
                                                        question.content
                                                    )
                                                }
                                            >
                                                {question.content}
                                            </Button>
                                        );
                                    })}
                                </Col>
                                <Col xs={4} className="mt-4">
                                    <Chatbox
                                        problemid={problemid}
                                        selectedQuestion={selectedQuestion}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProblemPage;
