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
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import NotFound from './components/NotFound';
const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<LandPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
