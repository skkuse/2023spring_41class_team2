import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { Left } from 'react-bootstrap/lib/Media';
import { StyledText } from '../styles/StyledText';
const MyPage: React.FC = () => {
    const [content, setContent] = useState('');
    
    let contents = null;
    if (content === '1'){
        contents = <div style = {{ textAlign: 'left'}}><StyledText > Change your username </StyledText> 
        <Form.Control style={{width: '50%', minWidth: '50px',marginTop: '10px', marginBottom: '15px'}}></Form.Control>
        <Button
        variant="secondary"
        style={{
            width: '50%',
            minWidth: '50px',
            marginBottom: '10px',
        }}
        >Submit
        </Button></div>

    }else if (content === '2')
    {
        contents = 
        <div style = {{ textAlign: 'left'}}>
            <StyledText > Enter your current password. </StyledText>
            <Form.Control style={{width: '50%', minWidth: '50px',marginTop: '10px', marginBottom: '15px'}}></Form.Control>
            <StyledText > Enter your new password. </StyledText>
            <Form.Control style={{width: '50%', minWidth: '50px',marginTop: '10px', marginBottom: '15px'}}></Form.Control>
            <StyledText > Enter your new password again. </StyledText> 
            <Form.Control style={{width: '50%', minWidth: '50px',marginTop: '10px', marginBottom: '15px'}}></Form.Control>
            <Button
            variant="secondary"
            style={{
                width: '50%',
                minWidth: '50px',
                marginBottom: '10px',
            }}
            >Submit
            </Button></div>
    }else if (content === '3'){
        contents = <div> credit : ?</div>
     
    }
    



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
                    <Nav.Item onClick={() => setContent('1')}>
                        <Nav.Link href="#"> Change Username</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={() => setContent('2')}>
                        <Nav.Link href="#">Change password</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={() => setContent('3')}>
                        <Nav.Link href="#">My Ranking</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>  
                        <Nav.Link style={{color: 'red'}} href="#">Delete My Account</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <Card className="p-4" style={{ minWidth: '500px', flexGrow: 8 }}>
                <div className="text-center mb-4 ">
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
                <div>{contents}</div>
            </Card>
        </Container>
    );
};

export default MyPage;
