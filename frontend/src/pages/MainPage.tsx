import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
import { commonAxios } from 'utils/commonAxios';
import ProblemList from 'components/ProblemList';

const MainPage: React.FC = () => {

    const [problemList, setProblemList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [solvedList, setSolvedList] = useState([]);

    const getProblemList = () => {
        commonAxios
            .get('/problems')
            .then((response) => {
                setProblemList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };



    useEffect(() => {
        getProblemList();
    }, []);


    return (
        <div style={{ backgroundColor: '#EBE2E2', minHeight: '100vh' }}>
            <Container
                className="d-flex justify-content-center align-items-start"
                style={{ minHeight: '10vh' }}
            >
                <Row>
                    <Col xs={8} className="mt-4">
                        <Card className="p-4" style={{ minWidth: '300px' }}>
                            <ProblemList data={problemList}/>
                        </Card>
                    </Col>
                    <Col xs={4} className="mt-4">
                        <Card className="p-4" style={{ minWidth: '300px' }}>
                            <table
                                className="table table-bordered w-auto"
                                style={{ width: '100%' }}
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th className="text-center">
                                            User Name
                                        </th>
                                        <th className="text-center">정답률</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Apple</td>
                                        <td>65%</td>
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
