import React, { useEffect } from 'react';



import { Counter } from './features/counter/Counter';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import NavBar from 'components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Page imports
import LandPage from './pages/LandPage';
import EditnAddPage from './pages/EditnAddPage'
import MainPage from './pages/MainPage';
import Mypage from './pages/MyPage';
import ManageUser from './pages/ManageUser';
import ManageProblem from './pages/ManageProblem';
import SignupPage from './pages/SignupPage';
import ProblemPage from './pages/ProblemPage';
import Admin from './pages/Admin';
import { getCookie } from 'utils/getCookie';
import { commonAxios } from 'utils/commonAxios';
import { set } from 'immer/dist/internal';
import { UserProvider } from 'utils/UserProvider';
import { ToastContainer } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const App: React.FC = () => {

    return (
        
            <div className="App">
                <ThemeProvider theme={theme}>
                    <UserProvider>
                        <GlobalStyles />
                        <BrowserRouter>
                            <Routes>
                                {/*랜딩, 회원가입 페이지에서 Navbar 표시 안함*/}
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
                                <Route path="/manageproblem" element={<Container>
                                    <Header/>
                                    <NavBar/>
                                    <ManageProblem />
                                </Container>} />
                                <Route path="/editnaddproblem" element={<Container>
                                    <Header/>
                                    <NavBar/>
                                    <EditnAddPage />
                                </Container>} />
                                <Route path="/problempage" element={<Container>
                                    <Header/>
                                    <NavBar/>
                                    <ProblemPage />
                                </Container>} />
                                <Route path="/mypage" element={<Container>
                                    <Header/>
                                    <NavBar/>
                                    <Mypage />
                                </Container>} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <ToastContainer position="bottom-center" autoClose={1000} />
                        </BrowserRouter>
                    </UserProvider>
                </ThemeProvider>
            </div>
        
    );
};

export default App;
