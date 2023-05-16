import React from 'react';
import { StyledText } from './StyledText';

const NotFound: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <h1>
                <StyledText>404 Not Found</StyledText>
            </h1>
        </div>
    );
};

export default NotFound;
