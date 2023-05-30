import React from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { Left } from 'react-bootstrap/lib/Media';

const MyPage: React.FC = () => {
    return (
        <Container
            fluid
            className="d-flex  "
            style={{
                minHeight: '100vh',
                backgroundColor: '#EEEEEE',
                margin: 0,
                padding: 0,
            }}
        >
            <div
                className="d-inline"
                style={{
                    backgroundColor: '#EEEEEE',
                    minHeight: '100vh',
                    display: 'inline-block',
                    flexGrow: 0.5,
                }}
            >
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar  ">
                    <Nav.Item>
                        <Nav.Link href="#"> Change Username</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Change password</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">My Ranking</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Delete My Account</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <Card className="p-4" style={{ minWidth: '1000px', flexGrow: 10 }}>
                <div className="text-center mb-4 flex-fill">
                    <h1
                        style={{
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif',
                            display: 'inline',
                        }}
                    >
                        My page
                    </h1>
                </div>
            </Card>
        </Container>
    );
};

export default MyPage;
