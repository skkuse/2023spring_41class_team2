import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
const ManageUser: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <Card className="p-4" style={{ minWidth: '500px' }}>
                            <table
                                className="table table-bordered w-auto"
                                style={{ width: '100%' }}
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center">User</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">Alice</td>

                                        <td className="span 2">
                                            <div
                                                className=" row justify-content-around col"
                                                role="group"
                                            >
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                        marginLeft: '5px',
                                                    }}
                                                >
                                                    Info
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Suspend
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="danger"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Ban
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Thmoas</td>

                                        <td className="span 2">
                                            <div
                                                className=" row justify-content-around col"
                                                role="group"
                                            >
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                        marginLeft: '5px',
                                                    }}
                                                >
                                                    Info
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Suspend
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="danger"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Ban
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManageUser;
