import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const MyPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <Card className="p-4" style={{ minWidth: '200px' }}>
                            <div className="text-center mb-4">
                                <h1
                                    style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Arial, sans-serif',
                                        display: 'inline',
                                    }}
                                >
                                    My page
                                </h1>
                            </div>
                            <div className="text-center mt-5">
                                <Button
                                    variant="secondary"
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Change Username
                                </Button>
                                <Button
                                    variant="secondary"
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Change password
                                </Button>
                                <Button
                                    variant="secondary"
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    My credit
                                </Button>
                                <Button
                                    variant="secondary"
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '40px',
                                    }}
                                >
                                    My Ranking
                                </Button>

                                <Button
                                    variant="danger"
                                    style={{
                                        width: '100%',
                                        minWidth: '400px',
                                        marginBottom: '100px',
                                    }}
                                >
                                    Delete My Account
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyPage;
