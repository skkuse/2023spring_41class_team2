import React from 'react';
import { StyledText } from '../styles/StyledText';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const NavBar: React.FC = () => {
    return (
        <NavBarContainer>
            <StyledText>Hello, user!</StyledText>
            <NavBarMenuContainer>
                <Link to="/mypage"><NavBarText>My Page</NavBarText></Link>
                <Link to="/admin"><NavBarText>Admin</NavBarText></Link>
                <NavBarText>Logout</NavBarText>
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