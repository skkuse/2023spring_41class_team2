import React from 'react';
import { StyledHeaderText } from '../styles/StyledText';
import { Button, Table } from 'react-bootstrap';

type UserManageListProps = {
    data: {
        userid: string;
        nickname: string;
        email: string;
        createdAt: EpochTimeStamp;
        updatedAt: EpochTimeStamp;
        isBanned: boolean;
        isAdmin: boolean;
    }[];
};

const UserManageList: React.FC<UserManageListProps> = ({ data }) => {
    return (
        <div>
            <StyledHeaderText>User Manage List</StyledHeaderText>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">UserID</th>
                        <th className="text-center">Nickname</th>
                        <th className="text-center">Banned</th>
                        <th className="text-center">Admin</th>
                        <th className="text-center">Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.userid}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{user.userid}</td>
                            <td className="text-center">{user.nickname}</td>
                            <td className="text-center">
                                {user.isBanned ? 'O' : ''}
                            </td>
                            <td className="text-center">
                                {user.isAdmin ? 'O' : ''}
                            </td>
                            <td className="text-center">
                                <Button className="mx-2">Info</Button>
                                <Button className="mx-2">Give Admin</Button>
                                <Button className="mx-2 btn-danger">Ban</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserManageList;
