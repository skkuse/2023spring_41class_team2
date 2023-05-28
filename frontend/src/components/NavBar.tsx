import React from 'react';
import { StyledText } from './StyledText';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const NavBar: React.FC = () => {
    return (
        <NavBarContainer>
            <h1><StyledText>Hello, user!</StyledText></h1>
            <NavBarMenuContainer>
                <Link to="/mypage">My Page</Link>
                <Link to="/admin">Admin</Link>
                <StyledText>Logout</StyledText>
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
`;

const NavBarMenuContainer= styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;