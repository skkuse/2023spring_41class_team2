import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { commonAxios } from '../utils/commonAxios';
import ProblemList from '../components/ProblemList';
import { AxiosResponse } from 'axios';
import { styled } from 'styled-components';
import Leaderboard from '../components/Leaderboard';
import { UserContext } from '../utils/UserProvider';

const MainPage: React.FC = () => {
    const { userid, nickname } = useContext(UserContext);
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

    const getSolvedList = () => {
        commonAxios
            .get(`/users/${userid}/solved`)
            .then((response) => {
                setSolvedList(response.data);
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
                            nickname: nickname,
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
        getUserList();
        getProblemList();
    }, []);

    useEffect(() => {
        if (userid && nickname) {
            getSolvedList();
        }
    }, [userid, nickname]);

    return (
        <MainPageContainer>
            <Row>
                <Col xs={8} className="mt-4">
                    <Card className="p-4" style={{ minWidth: '600px' }}>
                        <ProblemList
                            problemData={problemList}
                            solvedData={solvedList}
                        />
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
