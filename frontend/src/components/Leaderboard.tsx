import React from "react";
import { Table } from "react-bootstrap";
import { StyledText } from "styles/StyledText";

type LeaderboardProps = {
    data: {nickname: string, credit: number}[];
}

const Leaderboard: React.FC<LeaderboardProps>= ({data}) => {
    return (
        <div>
            <h3><StyledText>Leaderboard</StyledText></h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Credit</th>
                    </tr>    
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={user.nickname}>
                        <td>{index + 1}</td>
                        <td>{user.nickname}</td>
                        <td>{user.credit}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Leaderboard;