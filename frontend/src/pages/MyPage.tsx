import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { StyledText } from '../styles/StyledText';
import { UserContext } from '../utils/UserProvider';
import Toggle from 'react-toggle';
import { commonAxios } from '../utils/commonAxios';

const MyPage: React.FC = () => {
    const location = useLocation();
    const { isAdmin, userid, nickname } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);

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
                        <Nav.Link
                            href="/mypage?tab=accountsetting"
                            active={location.search === '?tab=accountsetting'}
                        >
                            Account Setting
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            href="/mypage?tab=sociallinks"
                            active={location.search === '?tab=sociallinks'}
                        >
                            {' '}
                            Social Links{' '}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            href="/mypage?tab=emailnotification"
                            active={
                                location.search === '?tab=emailnotification'
                            }
                        >
                            {' '}
                            Email Notification{' '}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {(location.search === '' ||
                location.search === '?tab=accountsetting') && (
                <Card
                    className="m-4 p-4"
                    style={{ minWidth: '1000px', flexGrow: 10 }}
                >
                    <div className="text-center mb-4 flex-fill">
                        <StyledText>Nickname</StyledText>
                        <StyledFormControl></StyledFormControl>
                        <StyledText>Email</StyledText>
                        <StyledFormControl></StyledFormControl>
                        <StyledText>Password</StyledText>
                        <StyledFormControl></StyledFormControl>

                        <Button className="m-4">Save</Button>
                        <Button className="m-4 btn-danger">
                            Delete my account
                        </Button>
                    </div>
                </Card>
            )}

            {location.search === '?tab=sociallinks' && (
                <Card
                    className="m-4 p-4"
                    style={{ minWidth: '1000px', flexGrow: 10 }}
                >
                    {/*need to impl*/}
                </Card>
            )}

            {location.search === '?tab=emailnotification' && (
                <Card
                    className="m-4 p-4"
                    style={{ minWidth: '1000px', flexGrow: 10 }}
                >
                    <div className="text-center mb-4 d-flex flex-column">
                        <h3>
                            <StyledText>Subscription Management</StyledText>
                        </h3>
                        <StyledText>Claim Notification</StyledText>
                        <Toggle />
                    </div>
                </Card>
            )}
        </Container>
    );
};

export default MyPage;

const StyledFormControl = styled(Form.Control)`
    width: 50%;
    margin: 0 auto;
`;
