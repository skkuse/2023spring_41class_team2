import React, { useContext, useEffect } from 'react';
import { StyledText } from '../styles/StyledText';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { commonAxios } from 'utils/commonAxios';
import { getCookie } from 'utils/getCookie';
import { set } from 'immer/dist/internal';
import { UserContext } from 'utils/UserProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {

    const { isAdmin, userid, nickname } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await commonAxios.post('/auth/logout');
            document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Logout Fail');
        }
    };

    return (
        <NavBarContainer>
            <StyledText>Hello, {nickname} ! </StyledText>
            <NavBarMenuContainer>
                <Link to="/mypage"><NavBarText>My Page</NavBarText></Link>
                { isAdmin && <Link to="/admin"><NavBarText>Admin</NavBarText></Link> }
                <NavBarText onClick={handleLogout}>Logout</NavBarText>
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

const NavBarMenuContainer= styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;

const NavBarText = styled.span`
    font-size: 20px;
    margin-right: 20px;
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
`