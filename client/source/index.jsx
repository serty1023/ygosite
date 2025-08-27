import { BrowserRouter as Router,Routes,Route,Outlet,Navigate } from "react-router-dom";
import Title from "./components/title.jsx";
import Header from "./components/header.jsx";
import EmptyHeader from "./components/emptyheader.jsx";
import Introduction from "./components/introduction.jsx";
import Tutorials from "./components/tutorial.jsx";
import Search from "./components/search.jsx";
import Card from "./components/card.jsx";
import Decks from "./components/decks.jsx";
import Deck from "./components/deck.jsx";
import LoginForm from "./components/login.jsx";
import RegisterForm from "./components/register.jsx";
import Footer from "./components/footer.jsx";

const routesPath =
[
    "home",
    "tutorial",
    "search",
    "cards",
    "decks"
]

function NormalLayout()
{
    return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
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
                <Route path="/ygosite/search/*" element={<Navigate to="/ygosite/search?mode=matched-search" replace />}/>
                <Route path="/ygosite" element={<NormalLayout/>}>
                    <Route path="home" element={<Introduction/>}/>
                    <Route path="tutorial" element={<Tutorials/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="cards" element={<Card/>}/>
                    <Route path="decks" element={<Decks/>}/>
                    <Route path="decks/:id" element={<Deck/>}/>
                </Route>
                <Route path="/ygosite/" element={<EmptyLayout/>}>
                    <Route path="login" element={<LoginForm/>}/>
                    <Route path="register" element={<RegisterForm/>}/>
                </Route>
            </Routes>
        </Router>
    </>);
};

export default Index;