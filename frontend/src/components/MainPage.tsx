import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MainPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <h1>main</h1>
            </Container>
        </div>
    );
};

export default MainPage;
