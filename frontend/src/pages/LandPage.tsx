import React, { useContext, useEffect, useState } from 'react';
import { commonAxios } from '../utils/commonAxios';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/getCookie';
import { styled } from 'styled-components';
import { UserContext } from '../utils/UserProvider';
import { toast } from 'react-toastify';

const LandPage: React.FC = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { updateUserContext } = useContext(UserContext);

    //사용자가 로그인 한 상태일 경우 메인 페이지로 이동
    useEffect(() => {
        const jwtToken = getCookie('accessToken');

        if (jwtToken) {
            navigate('/main');
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        commonAxios
            .post('/auth/login', { userid, password })
            .then(async (response) => {
                if (response.status === 201) {
                    document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
                    await fetchMyInfo();
                    navigate('/main');
                } else {
                    toast.error('Login failed');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Login failed');
            });
    };

    const fetchMyInfo = async () => {
        try {
            const response = await commonAxios.get('/auth/myinfo', {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            });

            console.log(response);

            updateUserContext(
                response.data.isAdmin,
                response.data.userid,
                response.data.nickname,
                response.data.email,
                response.data.isBanned
            );

            console.log('fetchMyInfo success');
        } catch (error) {
            console.log(error);
        }
    };

    const loginByEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <LoginContainer>
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
                                    value={userid}
                                    onChange={(e) => setUserid(e.target.value)}
                                    onKeyDown={loginByEnter}
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
                                    onKeyDown={loginByEnter}
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
                        <Link to="/signup">
                            <Button
                                className="btn-primary"
                                style={{ width: '100%', minWidth: '400px' }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </LoginContainer>
    );
};

export default LandPage;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;
