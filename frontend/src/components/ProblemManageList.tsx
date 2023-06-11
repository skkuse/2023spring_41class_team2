import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { StyledHeaderText } from '../styles/StyledText';
import { Link } from 'react-router-dom';

type ProblemManageListProps = {
    data: { id: number; title: string }[];
};

const ProblemManageList: React.FC<ProblemManageListProps> = ({ data }) => {
    return (
        <div>
            <StyledHeaderText style={{ color: 'black' }}>
                Problem Manage List
            </StyledHeaderText>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Problem Title</th>
                        <th className="text-center">Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((problem, index) => (
                        <tr key={problem.id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{problem.title}</td>
                            <td className="text-center">
                                <Link to={`/admin/problem/${problem.id}`}>
                                    <Button className="mx-2">Edit</Button>
                                </Link>
                                <Button className="btn-danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to="/admin/problem/add">
                <Button className="mx-2">Add Problem</Button>
            </Link>
        </div>
    );
};

export default ProblemManageList;
