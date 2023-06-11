import React from 'react';
import { Table } from 'react-bootstrap';
import { StyledHeaderText } from '../styles/StyledText';
import { styled } from 'styled-components';

type LeaderboardProps = {
    data: { nickname: string; credit: number }[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
    return (
        <LeaderboardContainer>
            <StyledHeaderText style={{ color: 'black' }}>
                Leaderboard
            </StyledHeaderText>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Rank</th>
                        <th className="text-center">User</th>
                        <th className="text-center">Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.nickname}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{user.nickname}</td>
                            <td className="text-center">{user.credit}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </LeaderboardContainer>
    );
};

const LeaderboardContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default Leaderboard;
