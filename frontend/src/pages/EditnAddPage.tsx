import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
import chat_image from '../assets/chat.png';
import user_image from '../assets/user.png';
import CodeEditor from '@uiw/react-textarea-code-editor';
const paragraphStyle = {
    whiteSpace: 'pre-wrap',
  };


const text = `Write the number of the correct pairs\n
What is the error of this code?\n
The malicious code is in Line (A), the reason is (B).\n
(1) (A) - 13 (B) - Integer Overflow or Wraparound\n
(2) (A) - 12 (B) - Improper initialization\n
(3) (A) - 08 (B) - Buffer copy without checking size of input\n
(4) (A) - 13 (B) - Null pointer dereference\n
`;

const EditnAddPage: React.FC = () => {
    const [textValue, setTextValue] = useState(text);
    
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Card className="p-4" style={{ minWidth: '200px' }}>
                        <Row>
                                <h1 style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Arial, sans-serif',
                                        display: 'inline',
                                        marginBottom: '10px'
                                    }}>Edit Page</h1>

                                <b >Problem definition</b>
                                <Form.Control
                                    defaultValue={textValue}
                                    style={{
                                        width: '100%',
                                        minWidth: '50px',
                                        marginBottom: '10px',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                </Form.Control>
                                
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

                                <b >Recommended Questions</b>
                                <Form.Control
                                    defaultValue="What happen if we cast negative signed to unsigned int?"
                                    style={{
                                        width: '100%',
                                        minWidth: '50px',
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    
                                </Form.Control>
                                <Form.Control
                                    defaultValue={'What happen if we set the size of malloc to negative values?'}
                                    
                                    style={{
                                        width: '100%',
                                        minWidth: '50px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    
                                </Form.Control>
                                <Row>
                                
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
                    
                            
                        
                        </Row>
                    </Card>
                    
                </Row>
            </Container>
        </div>
    );
};

export default EditnAddPage;
