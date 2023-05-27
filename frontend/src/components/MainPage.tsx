import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';

const MainPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '10vh' }}>
        <div className="text-center mb-4">
          <h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', display: 'inline' }}>Security Edu</h1>
          <img src={security_logo} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '10px', marginBottom: '20px' , marginTop: '20px' }} />
        </div>
      </Container>
      <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '10vh'}}>
        <Row>
          <Col xs={8} className="mt-4">
            <Card className="p-4" style={{ minWidth: '300px' }}>
            <table className="table table-bordered w-auto" style={{width : '100%'}}>
                  <thead>
                      <tr>
                          <th className='text-center'>No</th>
                          <th className='text-center'>title</th>
                          <th className='text-center'>Description</th>
                          <th className='text-center'>O/X</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>1</td>
                          <td>Break DB down</td>
                          <td>The basic concept of SQL injection</td>
                          <td >O</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Find Candy</td>
                          <td className = "span 6">The basic concept of stack overflow</td>
                          <td>X</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
          </Col>
          <Col xs={4} className="mt-4">
            <Card className="p-4" style={{ minWidth: '300px' }}>
            <table className="table table-bordered w-auto" style={{width : '100%'}}>
                  <thead>
                      <tr>
                          <th className='text-center'>No</th>
                          <th className='text-center'>User Name</th>
                          <th className='text-center'>정답률</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>1</td>
                          <td>Apple</td>
                          <td >65%</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Potato</td>
                          <td>30%</td>
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

export default MainPage;
