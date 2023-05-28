import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
import chat_image from '../assets/chat.png';
import user_image from '../assets/user.png';
import CodeEditor from '@uiw/react-textarea-code-editor';
const ProblemPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <div className="text-center mb-4">
                            <h1
                                style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Arial, sans-serif',
                                    display: 'inline',
                                }}
                            >
                                Security Edu
                            </h1>
                            <img
                                src={security_logo}
                                alt="Logo"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    marginLeft: '10px',
                                    marginBottom: '20px',
                                }}
                            />
                        </div>
                        <Card className="p-4" style={{ minWidth: '200px' }}>
                            <Row>
                                <Col xs={8} className="mt-4">
                                    <CodeEditor
                                        value="#include <unistd.h>
#include <stdlib.h> 
int main()
{
    char *buf;
    int len;
    /* for some file descriptor fd*/
    read(0, &len, sizeof(len));

    if (len > 8000) {return 0; }
    buf = malloc(len);
    read(0, buf, len);
    return 0;
}"
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
                                    <Form.Check
                                        inline
                                        label="1) line 13 : Integer Overflow or Wraparound"
                                        name="group1"
                                        type="radio"
                                        id={'inline-1'}
                                    ></Form.Check>
                                    <Form.Check
                                        inline
                                        label="2) line 12 : improper initialization"
                                        name="group1"
                                        type="radio"
                                        id={'inline-2'}
                                    ></Form.Check>
                                    <Form.Check
                                        inline
                                        label="3) line 8 : Buffer copy without checking size of input"
                                        name="group1"
                                        type="radio"
                                        id={'inline-3'}
                                    ></Form.Check>
                                    <Form.Check
                                        inline
                                        label="4) line 13 : Null pointer dereference"
                                        name="group1"
                                        type="radio"
                                        id={'inline-4'}
                                    ></Form.Check>
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
                                <Col xs={4} className="mt-4">
                                    <div overflow-y="auto">
                                        <div className="d-flex flex-row justify-content-end">
                                            <div>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    Question to the chat
                                                </p>
                                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                            <img
                                                src={user_image}
                                                alt="user"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row justify-content-start">
                                            <img
                                                src={chat_image}
                                                alt="charGPT"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                            <div>
                                                <p
                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                    style={{
                                                        backgroundColor:
                                                            '#f5f6f7',
                                                    }}
                                                >
                                                    The Answer to the question
                                                </p>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-end">
                                            <div>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    Question to the chat
                                                </p>
                                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                            <img
                                                src={user_image}
                                                alt="user"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row justify-content-start">
                                            <img
                                                src={chat_image}
                                                alt="charGPT"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                            <div>
                                                <p
                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                    style={{
                                                        backgroundColor:
                                                            '#f5f6f7',
                                                    }}
                                                >
                                                    The Answer to the question
                                                </p>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-end">
                                            <div>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    Question to the chat
                                                </p>
                                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                            <img
                                                src={user_image}
                                                alt="user"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row justify-content-start">
                                            <img
                                                src={chat_image}
                                                alt="charGPT"
                                                style={{
                                                    width: '45px',
                                                    height: '100%',
                                                }}
                                            />
                                            <div>
                                                <p
                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                    style={{
                                                        backgroundColor:
                                                            '#f5f6f7',
                                                    }}
                                                >
                                                    The Answer to the question
                                                </p>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Col xs={8} className="mt-4">
                                            <Form.Control
                                                type="text"
                                                style={{
                                                    width: '100%',
                                                    minWidth: '100px',
                                                    marginBottom: '10px',
                                                }}
                                                placeholder="Type your question"
                                            ></Form.Control>
                                        </Col>
                                        <Col xs={4} className="mt-4">
                                            <Button
                                                variant="secondary"
                                                style={{
                                                    width: '100%',
                                                    minWidth: '50px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                Ask
                                            </Button>
                                        </Col>
                                    </div>
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
