import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { StyledHeaderText, StyledText } from '../styles/StyledText';
import { UserContext } from '../utils/UserProvider';
import { commonAxios } from '../utils/commonAxios';
import ToggleSwitch from '../components/ToggleSwitch';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const MyPage: React.FC = () => {
    const location = useLocation();
    const { isAdmin, userid, nickname, email } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);
    const [localNickname, setLocalNickname] = useState(nickname);
    const [localEmail, setLocalEmail] = useState(email);
    const [CurPassword, setCurPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewPasswordConfirm, setNewPasswordConfirm] = useState('');

    const handleAccountSave = () => {
        const data = {
            nickname: localNickname,
            email: localEmail,
        };

        commonAxios
            .patch(`users/${userid}`, data)
            .then((res) => {
                if (res.status === 200) {
                    toast.info('New Account information saved!');
                } else {
                    toast.error('Failed to save account information');
                }
            })
            .catch((err) => {
                toast.error('Failed to save account information');
            });
    };

    const validatePassword = async () => {
        if (CurPassword === '') {
            toast.error('Please enter current password');
            return false;
        }

        if (NewPassword !== NewPasswordConfirm) {
            toast.error('New password and confirm password are not same');
            return false;
        }

        return commonAxios
            .post('auth/validate', { userid: userid, password: CurPassword })
            .then((res) => {
                if (res.status === 201) {
                    console.log('Current password is correct');
                    return true;
                } else {
                    toast.error('Current password is wrong');
                    return false;
                }
            })
            .catch((err) => {
                toast.error('Current password is wrong');
                return false;
            });
    };

    const handlePasswordSave = async () => {
        validatePassword().then((validation) => {
            if (!validation) {
                return;
            }

            const data = {
                password: NewPassword,
            };

            commonAxios
                .patch(`users/${userid}`, data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.info('New Password saved!');
                    } else {
                        toast.error('Failed to save new password');
                    }
                })
                .catch((err) => {
                    toast.error('Failed to save new password');
                });
        });
    };

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
                                pathname: '/mypage',
                                search: '?tab=accountsetting',
                            }}
                        >
                            <Nav.Link
                                active={
                                    location.search === '?tab=accountsetting'
                                }
                            >
                                <StyledText>Account Setting</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer
                            to={{
                                pathname: '/mypage',
                                search: '?tab=changepassword',
                            }}
                        >
                            <Nav.Link
                                active={
                                    location.search === '?tab=changepassword'
                                }
                            >
                                <StyledText>Change Password</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer
                            to={{
                                pathname: '/mypage',
                                search: '?tab=sociallinks',
                            }}
                        >
                            <Nav.Link
                                active={location.search === '?tab=sociallinks'}
                            >
                                <StyledText>Social Links</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer
                            to={{
                                pathname: '/mypage',
                                search: '?tab=emailnotification',
                            }}
                        >
                            <Nav.Link
                                active={
                                    location.search === '?tab=emailnotification'
                                }
                            >
                                <StyledText>Email Notification</StyledText>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            </div>

            <Card
                className="m-4 p-4"
                style={{ minWidth: '1000px', flexGrow: 10 }}
            >
                {(location.search === '' ||
                    location.search === '?tab=accountsetting') && (
                    <div className="text-center mb-4 flex-fill">
                        <StyledText>Nickname</StyledText>
                        <StyledFormControl
                            defaultValue={localNickname}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setLocalNickname(e.target.value)}
                        />
                        <StyledText>Email</StyledText>
                        <StyledFormControl
                            defaultValue={localEmail}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setLocalEmail(e.target.value)}
                        ></StyledFormControl>

                        <Button className="m-4" onClick={handleAccountSave}>
                            Save
                        </Button>
                    </div>
                )}

                {location.search === '?tab=changepassword' && (
                    <div className="text-center mb-4 flex-fill">
                        <StyledText>Current password</StyledText>
                        <StyledFormControl
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setCurPassword(e.target.value)}
                        />
                        <StyledText>New Password</StyledText>
                        <StyledFormControl
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNewPassword(e.target.value)}
                        />
                        <StyledText>Retype New Password</StyledText>
                        <StyledFormControl
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNewPasswordConfirm(e.target.value)}
                        />
                        <Button className="m-4" onClick={handlePasswordSave}>
                            Save
                        </Button>
                    </div>
                )}

                {location.search === '?tab=sociallinks' && (
                    <div className="mb-4 d-flex flex-column">
                        <StyledHeaderText>
                            Link Your Social TAGS
                        </StyledHeaderText>
                        <StyledText>This feature will release soon.</StyledText>
                        <SocialLinkContainer
                            className="m-4"
                            onClick={() =>
                                window.open('https://github.com', '_blank')
                            }
                        >
                            <StyledText>Connect Github Account</StyledText>
                        </SocialLinkContainer>
                    </div>
                )}

                {location.search === '?tab=emailnotification' && (
                    <div className="mb-4 d-flex flex-column">
                        <StyledHeaderText>
                            Subscription Management
                        </StyledHeaderText>
                        <ToggleContainer>
                            <StyledText>Claim Notification</StyledText>
                            <ToggleSwitch />
                        </ToggleContainer>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default MyPage;

const StyledFormControl = styled(Form.Control)`
    width: 50%;
    border: 2px solid black;
    background-color: ${(props) => props.theme.colors.formBackground};
    margin: 0 auto;
`;

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SocialLinkContainer = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid #eaeaea;
    justify-content: center;
    cursor: pointer;
`;
