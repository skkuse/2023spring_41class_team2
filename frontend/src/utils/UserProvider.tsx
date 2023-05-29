import React, { ReactNode, createContext, useState } from 'react';

interface UserContextState {
  isAdmin: boolean;
  userid: string;
  nickname: string;
  updateUserContext: (isAdmin: boolean, userid: string, nickname: string) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const initialUserContext: UserContextState = {
  isAdmin: false,
  userid: '',
  nickname: '',
  updateUserContext: () => {},
};

export const UserContext = createContext<UserContextState>(initialUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userid, setUserid] = useState('');
  const [nickname, setNickname] = useState('');

  const updateUserContext = (isAdmin: boolean, userid: string, nickname: string) => {
    setIsAdmin(isAdmin);
    setUserid(userid);
    setNickname(nickname);
  };

  return (
    <UserContext.Provider value={{ isAdmin, userid, nickname, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
