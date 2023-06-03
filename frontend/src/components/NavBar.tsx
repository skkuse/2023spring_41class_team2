import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../utils/UserProvider';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../utils/deleteCookie';

const NavBar: React.FC = () => {
    const { isAdmin, userid, nickname } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            deleteCookie('accessToken');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NavBarContainer>
            <NavBarMenuContainer>
                <NavBarText>Welcome, {nickname}! </NavBarText>
                <StyledLink to="/mypage" style={{}}>
                    <NavBarText>My Page |</NavBarText>
                </StyledLink>
                {isAdmin && (
                    <StyledLink to="/admin">
                        <NavBarText>Admin |</NavBarText>
                    </StyledLink>
                )}
                <StyledLink to="">
                    <NavBarText
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        Logout
                    </NavBarText>
                </StyledLink>
            </NavBarMenuContainer>
        </NavBarContainer>
    );
};

export default NavBar;

const NavBarContainer = styled.div`
    min-width: 100%;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: ${(props) => props.theme.colors.background};
    text-align: right;
`;

const NavBarMenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    margin: 0;
`;

const NavBarText = styled.span`
    font-size: 20px;
    margin-right: 20px;
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
    font-weight: bold;
`;
