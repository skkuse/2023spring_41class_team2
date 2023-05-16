import React from 'react';
import security_logo from '../assets/security_logo.png';
import { StyledText } from './StyledText';

const Header: React.FC = () => {
    return (
        <div className="text-center" style={{ backgroundColor: '#EBE2E2' }}>
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
                    marginBottom: '20px',
                }}
            />
        </div>
    );
};

export default Header;
