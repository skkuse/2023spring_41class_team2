import React from 'react';
import LandPage from './components/LandPage';
import Mypage from './components/MyPage'
import Admin from './components/Admin'
import ManageUser from './components/ManageUser'
import ManageProblem from './components/ManageProblem'
import SignupPage from './components/SignupPage'
import ProblemPage from './components/ProblemPage'
import MainPage from './components/MainPage'
import { Counter } from './features/counter/Counter';
import './App.css';

const App: React.FC = () => {
  //return <Mypage />;
  //return <ManageUser/>;
  //return <ManageProblem/>;
  //return <Admin />;
  //return <LoginPage/>;
  //return <SignupPage/>;
  //return <ProblemPage/>;
  return <MainPage/>;
};

export default App;
