import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import chat_image from '../assets/chat.png';
import user_image from '../assets/user.png';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Chatbox from '../components/Chatbox';
import { commonAxios } from '../utils/commonAxios';
import { useParams } from 'react-router-dom';

const ProblemPage: React.FC = () => {
    const [content, setContent] = useState('');
    const [code, setCode] = useState('');
    const [questions, setQuestions] = useState([]);
    const { problemid } = useParams<{ problemid: string }>();

    useEffect(() => {
        console.log(problemid);
    }, [problemid]);

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

                    console.log(`Content: ${content}`);
                    console.log(`Code: ${code}`);
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
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProblemData();
    }, []);

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
                                            >
                                                {question.content}
                                            </Button>
                                        );
                                    })}
                                </Col>
                                <Col xs={4} className="mt-4">
                                    <Chatbox />
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
