import React, { useContext, useEffect, useState } from 'react';
import { StyledHeaderText } from '../styles/StyledText';
import { Button, Table } from 'react-bootstrap';
import { commonAxios } from '../utils/commonAxios';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/getCookie';
import { UserContext } from '../utils/UserProvider';

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
    const [users, setUsers] = useState(data);
    const { userid } = useContext(UserContext);
    const myid = userid;

    const handleBanClick = (userid: string, flag: boolean) => {
        if (userid === myid) {
            toast.error('You cannot ban yourself');
            return;
        }
        const mydata = {
            isBanned: flag,
        };
        commonAxios
            .patch(`/users/${userid}/ban`, mydata, {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUsers(
                        users.map((user) =>
                            user.userid === userid
                                ? { ...user, isBanned: flag }
                                : user
                        )
                    );
                    if (!flag) {
                        toast.success(`${userid} Unbanned`);
                    } else {
                        toast.success(`${userid} Banned`);
                    }
                }
            })
            .catch((err) => {
                toast.error('Failed to ban operation');
            });
    };

    const handleAdminClick = (userid: string, flag: boolean) => {
        if (userid === myid) {
            toast.error('You cannot modify admin role to yourself');
            return;
        }

        const mydata = {
            isAdmin: flag,
        };
        commonAxios
            .patch(`/users/${userid}`, mydata, {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUsers(
                        users.map((user) =>
                            user.userid === userid
                                ? { ...user, isAdmin: flag }
                                : user
                        )
                    );
                    if (!flag) {
                        toast.success(`${userid} lose admin role`);
                    } else {
                        toast.success(`${userid} get admin role`);
                    }
                }
            })
            .catch((err) => {
                toast.error('Failed to give admin role');
            });
    };

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
                    {users.map((user, index) => (
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
                                {!user.isAdmin && (
                                    <Button
                                        className="mx-2"
                                        onClick={() =>
                                            handleAdminClick(user.userid, true)
                                        }
                                    >
                                        Give Admin
                                    </Button>
                                )}
                                {user.isAdmin && (
                                    <Button
                                        className="mx-2"
                                        onClick={() =>
                                            handleAdminClick(user.userid, false)
                                        }
                                    >
                                        Revoke Admin
                                    </Button>
                                )}
                                {!user.isBanned && (
                                    <Button
                                        className="mx-2 btn-danger"
                                        onClick={() =>
                                            handleBanClick(user.userid, true)
                                        }
                                    >
                                        Ban
                                    </Button>
                                )}
                                {user.isBanned && (
                                    <Button
                                        className="mx-2 btn-danger"
                                        onClick={() =>
                                            handleBanClick(user.userid, false)
                                        }
                                    >
                                        Unban
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserManageList;
