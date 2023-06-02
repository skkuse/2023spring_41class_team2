import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commonAxios } from '../utils/commonAxios';

const SignupPage: React.FC = () => {
    const [Id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const validateId = (id: string) => {
        const idRegex = /^[a-zA-Z0-9_]{5,20}$/;
        if (!idRegex.test(id)) {
            alert(
                '아이디는 5~20자의 영문 대/소문자, 숫자와 특수기호(_)만 사용 가능합니다.'
            );
            return false;
        }
        return true;
    };

    const validatePassword = (password: string) => {
        return true;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailRegex.test(email)) {
            alert('이메일 형식이 올바르지 않습니다.');
            return false;
        }
        return true;
    };

    const validateUsername = (username: string) => {
        return true;
    };

    const handleSignup = async () => {
        if (
            validateId(Id) &&
            validatePassword(password) &&
            validateEmail(email) &&
            validateUsername(username)
        ) {
            const postData = {
                userid: Id,
                password: password,
                email: email,
                nickname: username,
            };

            commonAxios
                .post('/auth/signup', postData)
                .then((response) => {
                    if (response.status === 201) {
                        console.log(response.data);
                        navigate('/');
                    } else {
                        toast.error('Signup failed');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Signup failed');
                });
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
                        <Card className="p-4" style={{ minWidth: '200px' }}>
                            <div className="text-center mb-4">
                                <h1
                                    style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Arial, sans-serif',
                                        display: 'inline',
                                    }}
                                >
                                    Sign up
                                </h1>
                            </div>
                            <div className="text-center mt-5">
                                <Form.Control
                                    type="id"
                                    value={Id} // 상태 변수와 연결
                                    onChange={(e) => setId(e.target.value)} // 입력이 변경될 때 상태 업데이트
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                    placeholder="ID"
                                ></Form.Control>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                    placeholder="Password"
                                ></Form.Control>
                                <Form.Control
                                    type="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                    placeholder="Username"
                                ></Form.Control>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        minWidth: '100px',
                                        marginBottom: '10px',
                                    }}
                                    placeholder="Email"
                                ></Form.Control>
                                <Button
                                    onClick={handleSignup}
                                    variant="secondary"
                                    style={{
                                        width: '100%',
                                        minWidth: '400px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignupPage;
