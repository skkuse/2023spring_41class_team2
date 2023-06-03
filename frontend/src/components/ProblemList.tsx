import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { StyledText } from '../styles/StyledText';
import { Link } from 'react-router-dom';

type ProblemListProps = {
    problemData: { id: number; title: string; solvedList: any }[];
    solvedData: { problemid: number; status: string }[];
};

const ProblemList: React.FC<ProblemListProps> = ({
    problemData,
    solvedData,
}) => {
    const modifiedData = problemData.map((problem) => ({
        id: problem.id,
        title: problem.title,
        isSolved: solvedData.some(
            (solved) =>
                solved.problemid === problem.id && solved.status === 'Solved'
        ),
    }));

    return (
        <div>
            <h3>
                <StyledText>Problem List</StyledText>
            </h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {modifiedData.map((problem, index) => (
                        <tr key={problem.id}>
                            <td>{index + 1}</td>
                            <td className="text-center">
                                <Link to={`/problem/${problem.id}`}>
                                    {problem.title}
                                </Link>
                            </td>
                            <td className="text-center">
                                {problem.isSolved ? 'O' : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProblemList;
