import React from 'react';
import { Table } from 'react-bootstrap';
import { StyledText } from '../styles/StyledText';

type ProblemListProps = {
    data: { id: number; title: string }[];
};

const ProblemList: React.FC<ProblemListProps> = ({ data }) => {
    return (
        <div>
            <h3>
                <StyledText>Problem List</StyledText>
            </h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((problem, index) => (
                        <tr key={problem.id}>
                            <td>{index + 1}</td>
                            <td>
                                <a href={`/problem/${problem.id}`}>
                                    {problem.title}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProblemList;
