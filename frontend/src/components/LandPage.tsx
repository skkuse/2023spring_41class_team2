import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png'
const LandPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col>
            <div className="text-center mb-4">
              <h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', display: 'inline' }}>Security Edu</h1>
              <img src={security_logo} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '10px', marginBottom: '20px' }} />
            </div>
            <Card className="p-4" style={{ minWidth: '400px' }}>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Control type="email" placeholder="Enter ID" style={{ backgroundColor: '#FBF3F3'}}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Control type="password" placeholder="Enter Password" style={{ backgroundColor: '#FBF3F3'}}/>
                </Form.Group>
              </Form>
            </Card>
            <div className="text-center mt-4">
              <Button variant="primary" style={{ width: '100%', minWidth: '400px', marginBottom:'10px' }}>Log In</Button>
              <Button variant="primary" style={{ width: '100%', minWidth: '400px' }}>Sign Up</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandPage;