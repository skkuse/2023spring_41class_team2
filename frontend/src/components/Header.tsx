import React from 'react';
import security_logo from '../assets/security_logo.png';
import { StyledText } from '../styles/StyledText';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderLink to="/">
                <h1 style={{ display: 'inline' }}>
                    <StyledText>Security Edu</StyledText>
                </h1>
                <img
                    src={security_logo}
                    alt="Logo"
                    style={{
                        width: '50px',
                        height: '50px',
                        marginLeft: '10px',
                        marginBottom: '30px',
                    }}
                />
            </HeaderLink>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: ${(props) => props.theme.colors.header};
`;

const HeaderLink = styled(Link)`
    text-decoration: none;
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    color: ${(props) => props.theme.colors.white};
`;
