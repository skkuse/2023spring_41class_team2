import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png'
import chat_image from '../assets/chat.png'
import user_image from '../assets/user.png'
const ProblemPage: React.FC = () => {
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
              <Col md="8">
                <Row>
                    <div>

                    </div>
                </Row>
              </Col>
              <Col md="4">
              <div className="overflow-auto">
                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          Question to the chat
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={user_image}
                        alt="user"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={chat_image}
                        alt="charGPT"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          The Answer to the question
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          Question to the chat
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={user_image}
                        alt="user"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={chat_image}
                        alt="charGPT"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          The Answer to the question
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>
              </div>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProblemPage;