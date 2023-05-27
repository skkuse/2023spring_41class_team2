import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png'
const SignupPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col>
            <div className="text-center mb-4">
              <h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', display: 'inline' }}>Security Edu</h1>
              <img src={security_logo} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '10px', marginBottom: '20px' }} />
            </div>
            <Card className="p-4" style={{ minWidth: '200px' }}>
              <div className="text-center mb-4">
                <h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', display: 'inline' }}>Sign up</h1>
              </div>
              <div className="text-center mt-5">
                <Form.Control type="id" style={{ width: '100%', minWidth: '100px', marginBottom:'10px' }} placeholder="ID"></Form.Control> 
                <Form.Control type="password" style={{ width: '100%', minWidth: '100px', marginBottom:'10px' }} placeholder="Password"></Form.Control> 
                <Form.Control type="username" style={{ width: '100%', minWidth: '100px', marginBottom:'10px' }} placeholder="Username"></Form.Control> 
                <Form.Control type="email" style={{ width: '100%', minWidth: '100px', marginBottom:'10px' }} placeholder="Email"></Form.Control> 
                <Button variant="secondary" style={{ width: '100%', minWidth: '400px', marginBottom:'10px'}}>Sign up</Button>
              </div>
            </Card>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;