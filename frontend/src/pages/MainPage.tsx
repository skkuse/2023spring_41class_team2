import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import security_logo from '../assets/security_logo.png';
import { commonAxios } from '../utils/commonAxios';
import ProblemList from '../components/ProblemList';
import { get } from 'http';
import { AxiosResponse } from 'axios';
import { styled } from 'styled-components';
import Leaderboard from '../components/Leaderboard';

const MainPage: React.FC = () => {
    const [problemList, setProblemList] = useState([]);
    const [userList, setUserList] = useState<
        { nickname: string; credit: number }[]
    >([]);
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

    const getUserList = () => {
        commonAxios
            .get('users/leaderboard')
            .then(
                (
                    response: AxiosResponse<
                        {
                            _count: { problemid: number };
                            userid: string;
                            nickname: string;
                        }[]
                    >
                ) => {
                    const transformedData = response.data.map(
                        ({ _count: { problemid }, userid, nickname }) => ({
                            nickname: userid,
                            credit: problemid,
                        })
                    );
                    setUserList(transformedData);
                }
            )
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProblemList();
        getUserList();
    }, []);

    return (
        <MainPageContainer>
            <Row>
                <Col xs={8} className="mt-4">
                    <Card className="p-4" style={{ minWidth: '600px' }}>
                        <ProblemList data={problemList} />
                    </Card>
                </Col>
                <Col xs={4} className="mt-4">
                    <Card className="p-4" style={{ minWidth: '300px' }}>
                        <Leaderboard data={userList} />
                    </Card>
                </Col>
            </Row>
        </MainPageContainer>
    );
};

export default MainPage;

const MainPageContainer = styled.div`
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: ${(props) => props.theme.colors.background};
`;
