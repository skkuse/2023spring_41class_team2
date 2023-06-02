import React, { ReactNode, createContext, useState } from 'react';

interface UserContextState {
  isAdmin: boolean;
  userid: string;
  nickname: string;
  email: string;
  updateUserContext: (isAdmin: boolean, userid: string, nickname: string, email: string) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const initialUserContext: UserContextState = {
  isAdmin: false,
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

  const updateUserContext = (isAdmin: boolean, userid: string, nickname: string, email: string) => {
    setIsAdmin(isAdmin);
    setUserid(userid);
    setNickname(nickname);
    setEmail(email);
  };

  return (
    <UserContext.Provider value={{ isAdmin, userid, nickname, email, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
