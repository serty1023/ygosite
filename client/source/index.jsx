import { BrowserRouter as Router,Routes,Route,Outlet,Navigate } from "react-router-dom";
import Title from "./components/title.jsx";
import Header from "./components/header.jsx";
import Home from "./components/home.jsx";
import EmptyHeader from "./components/emptyheader.jsx";
import Tutorials from "./components/tutorial.jsx";
import CardSearch from "./components/card_search.jsx";
import Card from "./components/card.jsx";
import LoginForm from "./components/login.jsx";
import RegisterForm from "./components/register.jsx";

function NormalLayout()
{
    return (
    <>
        <Header/>
        <Outlet/>
    </>);
};

function EmptyLayout()
{
    return (
    <>
        <EmptyHeader/>
        <Outlet/>
    </>);
};

function Index()
{
    return (
    <>
        <Router>
            <Title/>
            <Routes>
                <Route path="/*" element={<Navigate to="/ygosite/home" replace/>}/>
                <Route path="/ygosite/" element={<Navigate to="/ygosite/home" replace/>}/>
                <Route path="/ygosite/search/*" element={<Navigate to="/ygosite/search?mode=matched-search" replace/>}/>
                <Route path="/ygosite" element={<NormalLayout/>}>
                    <Route path="home" element={<Home/>}/>
                    <Route path="tutorial/:section?/:page?" element={<Tutorials/>}/>
                    <Route path="card_search" element={<CardSearch/>}/>
                    <Route path="cards" element={<Card/>}/>
                </Route>
                <Route path="/ygosite" element={<EmptyLayout/>}>
                    <Route path="login" element={<LoginForm/>}/>
                    <Route path="register" element={<RegisterForm/>}/>
                </Route>
            </Routes>
        </Router>
    </>);
};

export default Index;