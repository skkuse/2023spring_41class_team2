import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
import chat_image from '../assets/chat.png';
import user_image from '../assets/user.png';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CardHeader from 'react-bootstrap/esm/CardHeader';
const text = `Write the number of the correct pairs\n\
What is the error of this code?\n\
The malicious code is in Line (A), the reason is (B).\n\
(1) (A) - 13 (B) - Integer Overflow or Wraparound\n\
(2) (A) - 12 (B) - Improper initialization\n\
(3) (A) - 08 (B) - Buffer copy without checking size of input\n\
(4) (A) - 13 (B) - Null pointer dereference\n\
`;

const ProblemPage: React.FC = () => {
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
                                    <b className='fs-2'>Question #7</b>
                                    <p  style={{ whiteSpace: 'pre-line' }}>{text}</p>
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
                                    <Button
                                        variant="light"
                                        style={{
                                            width: '100%',
                                            minWidth: '50px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        What happen if we cast negative signed to unsigned int?
                                    </Button>
                                    <Button
                                        variant="light"
                                        style={{
                                            width: '100%',
                                            minWidth: '50px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        What happen if we set the size of malloc to negative values?
                                    </Button>
                                </Col>
                                <Col xs={4} className="mt-4">
                                    <Card id="chat1" style={{ borderRadius: "15px" }}>
                                        <CardHeader className="d-flex justify-content-between align-items-center p-3 bg-custom text-white border-bottom-0"
                                        style={{
                                            borderTopLeftRadius: "15px",
                                            borderTopRightRadius: "15px",
                                            backgroundColor: "black",
                                        }}
                                        >
                                            <p className="mb-0 fw-bold">Live chat</p>

                                        </CardHeader>
                                        <div style={{overflow: 'scroll', height: '600px'}}>
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
                                                    alt="chatGPT"
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
                                                    alt="chatGPT"
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
                                                    What happen if we cast negative signed to unsigned int?
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
                                                    alt="chatGPT"
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
                                                        When you cast a negative signed integer to an unsigned integer, the result depends on the range of values that can be represented by the unsigned integer type.

    In most programming languages, the casting operation simply changes the interpretation of the bits in memory without changing their actual values. If the negative signed integer is within the range of representable values for the unsigned integer type, the resulting value will be the same in both the signed and unsigned forms.

    However, if the negative signed integer falls outside the range of representable values for the unsigned integer type, the behavior is implementation-defined. This means that the result is not guaranteed and may vary depending on the specific programming language, compiler, and platform.

    In some cases, the result of casting a negative signed integer to an unsigned integer may wrap around and produce a large positive value. This is known as integer overflow. For example, consider casting -1 (signed) to an 8-bit unsigned integer. The result would be 255 (unsigned).
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                        12:00 PM | Aug 13
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Row>
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
                                    </Row>
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
