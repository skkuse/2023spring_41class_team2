import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LandPage: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('/auth/login', { userId, password }); //테스트 안해봄

        if (response.status === 200) {
            navigate('/main');
        } else {
            setError('Login failed');
        }
    };

    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <Card className="p-4" style={{ minWidth: '400px' }}>
                            <Form onSubmit={handleLogin}>
                                <Form.Group
                                    controlId="formBasicEmail"
                                    className="mb-4"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter ID"
                                        value={userId}
                                        onChange={(e) =>
                                            setUserId(e.target.value)
                                        }
                                        style={{ backgroundColor: '#FBF3F3' }}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="formBasicPassword"
                                    className="mb-4"
                                >
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        style={{ backgroundColor: '#FBF3F3' }}
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        minWidth: '400px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Log In
                                </Button>
                            </Form>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Button
                                className="btn-primary"
                                style={{ width: '100%', minWidth: '400px' }}
                            >
                                Sign Up
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Link to="/main">
                <h1>Test to main</h1>
            </Link>
        </div>
    );
};

export default LandPage;
