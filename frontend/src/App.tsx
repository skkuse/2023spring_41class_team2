import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { UserContext, UserProvider } from './utils/UserProvider';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Page imports
import LandPage from './pages/LandPage';
import MainPage from './pages/MainPage';
import Mypage from './pages/MyPage';
import SignupPage from './pages/SignupPage';
import ProblemPage from './pages/ProblemPage';
import Admin from './pages/Admin';
import ProblemFormPage from './pages/ProblemFormPage';

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
                            <Route
                                path="/"
                                element={
                                    <Container>
                                        <Header />
                                        <LandPage />
                                        <Footer />
                                    </Container>
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <Container>
                                        <Header />
                                        <SignupPage />
                                        <Footer />
                                    </Container>
                                }
                            />

                            <Route
                                path="/main"
                                element={
                                    <Container>
                                        <Header />
                                        <NavBar />
                                        <MainPage />
                                        <Footer />
                                    </Container>
                                }
                            />
                            <Route
                                path="/mypage"
                                element={
                                    <Container>
                                        <Header />
                                        <NavBar />
                                        <Mypage />
                                        <Footer />
                                    </Container>
                                }
                            />
                            <Route
                                path="/problem/:problemid"
                                element={
                                    <Container>
                                        <Header />
                                        <NavBar />
                                        <ProblemPage />
                                    </Container>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute>
                                        <Container>
                                            <Header />
                                            <NavBar />
                                            <Admin />
                                        </Container>
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/admin/problem/add"
                                element={
                                    <PrivateRoute>
                                        <Container>
                                            <Header />
                                            <NavBar />
                                            <ProblemFormPage />
                                        </Container>
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/admin/problem/:problemid"
                                element={
                                    <PrivateRoute>
                                        <Container>
                                            <Header />
                                            <NavBar />
                                            <ProblemFormPage />
                                        </Container>
                                    </PrivateRoute>
                                }
                            />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <ToastContainer
                            position="bottom-center"
                            autoClose={1000}
                        />
                    </BrowserRouter>
                </UserProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
