import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { StyledHeaderText } from '../styles/StyledText';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

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
        <ProblemListContainer>
            <StyledHeaderText style={{ color: 'black' }}>
                Problem List
            </StyledHeaderText>

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
        </ProblemListContainer>
    );
};

export default ProblemList;

const ProblemListContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
