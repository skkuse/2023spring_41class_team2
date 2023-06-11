import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CodeBlock } from 'react-code-blocks';
import Chatbox from '../components/Chatbox';
import { commonAxios } from '../utils/commonAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../utils/UserProvider';
import { StyledHeaderText } from '../styles/StyledText';
import { styled } from 'styled-components';

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
        <MyContainer>
            <Row xs={12}>
                <Col xs={8}>
                    <ProblemContainer>
                        <StyledHeaderText>Problem Description</StyledHeaderText>
                        <pre
                            style={{
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                            }}
                        >
                            {content}
                        </pre>

                        <StyledHeaderText>Problem Code</StyledHeaderText>
                        <CodeBlock
                            text={code}
                            language={'C'}
                            showLineNumbers={true}
                            padding={15}
                            style={{
                                fontSize: 14,
                                backgroundColor: '#fafafa',
                                fontFamily:
                                    'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />

                        <Form.Control
                            value={userAnswer}
                            onChange={(e: any) => setUserAnswer(e.target.value)}
                            type="text"
                            style={{
                                width: '100%',
                                minWidth: '130px',
                                marginTop: '20px',
                                marginBottom: '10px',
                            }}
                            placeholder="Type your answer"
                        ></Form.Control>

                        <Button
                            onClick={validateSubmission}
                            style={{
                                width: '100%',
                                minWidth: '50px',
                                marginBottom: '10px',
                            }}
                        >
                            Submit
                        </Button>

                        <StyledHeaderText>
                            Recommended Questions
                        </StyledHeaderText>
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
                                        handleQuestionClick(question.content)
                                    }
                                >
                                    {question.content}
                                </Button>
                            );
                        })}
                    </ProblemContainer>
                </Col>
                <Col xs={3}>
                    <ChatboxContainer>
                        <Chatbox
                            problemid={problemid}
                            selectedQuestion={selectedQuestion}
                        />
                    </ChatboxContainer>
                </Col>
            </Row>
        </MyContainer>
    );
};

const MyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProblemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    padding: 2rem;
`;

const ChatboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
    margin-top: 2rem;
`;

export default ProblemPage;
