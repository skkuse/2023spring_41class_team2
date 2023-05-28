import React from 'react';



import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import NavBar from 'components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';

// Page imports
import LandPage from './pages/LandPage';
import MainPage from './pages/MainPage';
import Mypage from './pages/MyPage';
import ManageUser from './pages/ManageUser';
import ManageProblem from './pages/ManageProblem';
import SignupPage from './pages/SignupPage';
import ProblemPage from './pages/ProblemPage';
import Admin from './components/Admin';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const ContentBox = styled.div`
  padding: 50px 0px;
`;

const App: React.FC = () => {
    return (
        
            <div className="App">
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            {/*랜딩 페이지에서 Navbar 표시 안함*/}
                            <Route path="/" element={<Container>
                                <Header/>
                                <LandPage />
                            </Container>} />
                            <Route path='/signup' element={<Container>
                                <Header/>
                                <SignupPage />
                            </Container>} />

                            <Route path="/main" element={<Container>
                                <Header/>
                                <NavBar/>
                                <MainPage />
                            </Container>} />
                            
                            <Route path="/mypage" element={<Container>
                                <Header/>
                                <NavBar/>
                                <Mypage />
                            </Container>} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        
    );
};

export default App;
