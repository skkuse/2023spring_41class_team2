import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Nav, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { StyledText } from '../styles/StyledText';
import { styled } from 'styled-components';
import { commonAxios } from '../utils/commonAxios';
import { getCookie } from '../utils/getCookie';
import ProblemManageList from '../components/ProblemManageList';
import { useLocation } from 'react-router-dom';
import UserManageList from '../components/UserManageList';

const Admin: React.FC = () => {
    const location = useLocation();
    const [userList, setUserList] = useState([]);
    const [problemList, setProblemList] = useState([]);

    const getUserList = async () => {
        commonAxios
            .get('/users', {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUserList(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getProblemList = async () => {
        commonAxios
            .get('/problems', {})
            .then((res) => {
                if (res.status === 200) {
                    setProblemList(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUserList();
        getProblemList();
    }, [location.search]);

    return (
        <Container
            fluid
            className="d-flex  "
            style={{
                minHeight: '100vh',
                margin: 0,
                padding: 0,
            }}
        >
            <div
                className="d-inline"
                style={{
                    minHeight: '100vh',
                    display: 'inline-block',
                    flexGrow: 0.5,
                }}
            >
                <Nav className="col-md-12 d-none d-md-block sidebar m-4">
                    <Nav.Item>
                        <LinkContainer
                            to={{
                                pathname: '/admin',
                                search: '?tab=manageuser',
                            }}
                        >
                            <Nav.Link
                                active={location.search === '?tab=manageuser'}
                            >
                                <StyledText>Manage User</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer
                            to={{
                                pathname: '/admin',
                                search: '?tab=manageproblem',
                            }}
                        >
                            <Nav.Link
                                active={
                                    location.search === '?tab=manageproblem'
                                }
                            >
                                <StyledText>Manage Problem</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            </div>

            <Card
                className="m-4 p-4"
                style={{ minWidth: '1000px', flexGrow: 10 }}
            >
                <h1>
                    <StyledText>Admin Page</StyledText>
                </h1>
                {(location.search === '' ||
                    location.search === '?tab=manageuser') && (
                    <UserManageList data={userList} />
                )}

                {location.search === '?tab=manageproblem' && (
                    <ProblemManageList data={problemList} />
                )}
            </Card>
        </Container>
    );
};

export default Admin;

const StyledFormControl = styled(Form.Control)`
    width: 50%;
    border: 2px solid black;
    background-color: ${(props) => props.theme.colors.formBackground};
    margin: 0 auto;
`;
