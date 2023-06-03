import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { StyledHeaderText } from '../styles/StyledText';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { commonAxios } from '../utils/commonAxios';
import { getCookie } from '../utils/getCookie';

const paragraphStyle = {
    whiteSpace: 'pre-wrap',
};

const ProblemFormPage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { problemid } = useParams<{ problemid: string | undefined }>();
    const [code, setCode] = useState('');

    const handleSave = () => {
        toast.success('Problem Saved! Back to Admin Page');
        const data = {
            title: title,
            content: content,
            code: code,
            answer: answer,
        };
        if (problemid) {
            commonAxios
                .patch(`/problems/${problemid}`, data, {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Problem Saved! Back to Admin Page');
                        setTimeout(() => {
                            navigate('/admin?tab=manageproblem');
                        }, 2000);
                    }
                })
                .catch((err) => {
                    toast.error('Failed to save problem');
                });
        } else {
            commonAxios
                .post(`/problems`, data, {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Problem Saved! Back to Admin Page');
                        setTimeout(() => {
                            navigate('/admin?tab=manageproblem');
                        }, 2000);
                    }
                })
                .catch((err) => {
                    toast.error('Failed to save problem');
                });
        }
    };

    const getProblemData = () => {
        if (!problemid) return;

        commonAxios
            .get(`/problems/${problemid}`)
            .then((res) => {
                if (res.status === 200) {
                    const decoder = new TextDecoder('utf-8');
                    const contentBuffer = new Uint8Array(res.data.content.data);
                    const content = decoder.decode(contentBuffer);

                    const codeBuffer = new Uint8Array(res.data.code.data);
                    const code = decoder.decode(codeBuffer);
                    setTitle(res.data.title);
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

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row>
                <Card className="p-4" style={{ minWidth: '200px' }}>
                    <Row>
                        <StyledHeaderText>Problem Title</StyledHeaderText>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                minWidth: '50px',
                                marginBottom: '10px',
                            }}
                        />
                        <StyledHeaderText>Problem Description</StyledHeaderText>

                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                                width: '100%',
                                minWidth: '50px',
                                minHeight: '500px',
                                marginBottom: '10px',
                                whiteSpace: 'pre-wrap',
                            }}
                        ></Form.Control>
                        {code && (
                            <CodeEditor
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
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
                        )}
                        {!code && (
                            <CodeEditor
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                language="c"
                                placeholder="Add New Code here"
                                padding={15}
                                style={{
                                    fontSize: 14,
                                    backgroundColor: '#fafafa',
                                    fontFamily:
                                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}
                            />
                        )}

                        <StyledHeaderText>
                            Recommended Questions
                        </StyledHeaderText>

                        {questions.map((question: any) => {
                            return (
                                <Form.Control
                                    value={question.content}
                                    key={question.id}
                                    style={{
                                        width: '100%',
                                        minWidth: '50px',
                                        marginBottom: '10px',
                                    }}
                                />
                            );
                        })}

                        {questions.length === 0 && (
                            <Form.Control
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Add New Question"
                                style={{
                                    width: '100%',
                                    minWidth: '50px',
                                    marginBottom: '10px',
                                }}
                            />
                        )}
                        <StyledHeaderText>Answer</StyledHeaderText>
                        <Form.Control
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />

                        <Row>
                            <Button
                                variant="secondary"
                                onClick={handleSave}
                                style={{
                                    width: '20%',
                                    minWidth: '50px',
                                    margin: '10px',
                                }}
                            >
                                Save
                            </Button>
                        </Row>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
};

export default ProblemFormPage;
