import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
const ManageProblem: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <Card className="p-4" style={{ minWidth: '1000px' }}>
                            <table
                                className="table table-bordered w-auto"
                                style={{ width: '100%' }}
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th className="text-center">title</th>
                                        <th className="text-center">
                                            Description
                                        </th>
                                        <th className="text-center">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Break DB down</td>
                                        <td>
                                            The basic concept of SQL injection
                                        </td>
                                        <td>
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
                                                    Edit
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Hide
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="danger"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Find Candy</td>
                                        <td className="span 6">
                                            The basic concept of stack overflow
                                        </td>
                                        <td>
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
                                                    Edit
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="success"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Hide
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    variant="danger"
                                                    style={{
                                                        width: '30%',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                        <div className="text-center mb-4">
                            <Button
                                className="btn"
                                variant="secondary"
                                style={{ width: '100%', marginRight: '5px' }}
                            >
                                Add New Problem
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManageProblem;
