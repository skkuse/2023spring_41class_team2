import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { getCookie } from './getCookie';
import { commonAxios } from './commonAxios';

interface UserContextState {
    isAdmin: boolean;
    userid: string;
    nickname: string;
    email: string;
    isBanned: boolean;
    updateUserContext: (
        isAdmin: boolean,
        isBanned: boolean,
        userid: string,
        nickname: string,
        email: string
    ) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const initialUserContext: UserContextState = {
    isAdmin: false,
    isBanned: false,
    userid: '',
    nickname: '',
    email: '',
    updateUserContext: () => {},
};

export const UserContext = createContext<UserContextState>(initialUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userid, setUserid] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [isBanned, setIsBanned] = useState(false);

    const updateUserContext = (
        isAdmin: boolean,
        isBanned: boolean,
        userid: string,
        nickname: string,
        email: string
    ) => {
        setIsAdmin(isAdmin);
        setUserid(userid);
        setNickname(nickname);
        setEmail(email);
        setIsBanned(isBanned);
    };

    const fetchMyInfo = async () => {
        try {
            const response = await commonAxios.get('/auth/myinfo', {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            });

            updateUserContext(
                response.data.isAdmin,
                response.data.isBanned,
                response.data.userid,
                response.data.nickname,
                response.data.email
            );

            console.log('fetchMyInfo success');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const jwtToken = getCookie('accessToken');
        if (jwtToken) {
            fetchMyInfo();
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                isAdmin,
                isBanned,
                userid,
                nickname,
                email,
                updateUserContext,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
