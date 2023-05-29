

const Leaderboard = (data: any[]) => {
    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                {data.map((user, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{user.nickname}</td>
                        <td>{user.credit}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Leaderboard;