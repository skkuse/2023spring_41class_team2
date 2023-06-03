import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { StyledText } from '../styles/StyledText';
import { Link } from 'react-router-dom';

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
                                <Link to={`/problem/${problem.id}`}>
                                    {problem.title}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProblemList;
