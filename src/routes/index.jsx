import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate
} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import LandingPage from "../pages/landing-page/LandingPage";
import Home from "../pages/home/home-page/Home.jsx";
import Agenda from "../pages/home/agenda-page/Agenda";
import Pacientes from "../pages/home/pacientes-page/Pacientes";
import Relatorios from "../pages/home/relatorios-page/Relatorios";
import SignIn from "../pages/signin/LogIn.jsx";
import Signup from "../pages/signup/CadastroEmail.jsx";
import RecoverPassword from "../pages/recover-password/RecoverPassword.jsx";

import { AuthContext, AuthProvider } from "../contexts/auth";
import ServidorError from "../pages/erros/error-500";
import Loading from "../components/loading/Loading";

const AppRoutes = () => {
    const [Carregando, setCarregamento] = useState(true);

    //Função que avalia se o valor do contexto é autenticado ou não, redirecionando para suas respectivas páginas
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return (
                <Loading />
            )
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    useEffect(() => {
        setTimeout(() => {
            setCarregamento(false); // Simulando que o carregamento tenha terminado
        }, 2000);
    }, []);

    return (
        <Router>
            {Carregando ?
                (<Loading />)
                :
                (<AuthProvider>
                    <Routes>
                        <Route
                            exact path="/login"
                            element={<SignIn />}
                        />
                        <Route
                            exact path="/error-500"
                            element={<ServidorError />}
                        />
                        <Route
                            exact path="/recover-password"
                            element={<RecoverPassword />}
                        />
                        <Route
                            exact path="/"
                            element={<LandingPage />}
                        />
                        <Route
                            exact path="/signup"
                            element={<Signup />}
                        />
                        <Route
                            exact path="/home"
                            element={
                                <Private>
                                    <Home />
                                </Private>} />
                        <Route
                            exact path="/agenda"
                            element={
                                <Private>
                                    <Agenda />
                                </Private>} />
                        <Route
                            exact path="/pacientes"
                            element={
                                <Private>
                                    <Pacientes />
                                </Private>} />
                        <Route
                            exact path="/relatorios"
                            element={
                                <Private>
                                    <Relatorios />
                                </Private>} />
                    </Routes>
                </AuthProvider>)}
        </Router>
    )
};

export default AppRoutes;

