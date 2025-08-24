import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Title from "./components/title.jsx";
import Header from "./components/header.jsx";
import EmptyHeader from "./components/emptyheader.jsx";
import Introduction from "./components/introduction.jsx";
import Tutorials from "./components/tutorial.jsx";
import Search from "./components/search.jsx";
import Card from "./components/card.jsx";
import Decks from "./components/decks.jsx";
import LoginForm from "./components/login.jsx";
import Footer from "./components/footer.jsx";

const routesPath =
[
    "home",
    "tutorial",
    "search",
    "cards",
    "decks"
]

function Index()
{
    return (
    <>
        <Router>
            <Title/>
            <Routes>
                <Route path="/" element={<Navigate to="/ygosite/home" replace/>}/>
                <Route path="/ygosite" element={<Navigate to="/ygosite/home" replace/>}/>
                <Route path="/ygosite/*" element={<Navigate to="/ygosite/home" replace/>}/>
                {routesPath.map(path =>
                (
                    <Route path={`/ygosite/${path}`} element={<Header/>}/>
                ))}
                <Route path="/ygosite/login" element={<EmptyHeader/>}/>
            </Routes>
            <Routes>
                <Route path="/ygosite/search/*" element={<Navigate to="/ygosite/search?mode=matched-search" replace/>}/>
                <Route path="/ygosite/home" element={<Introduction/>}/>
                <Route path="ygosite/tutorial" element={<Tutorials/>}/>
                <Route path="/ygosite/search" element={<Search/>}/>
                <Route path="ygosite/cards" element={<Card/>}/>
                <Route path="/ygosite/decks" element={<Decks/>}/>
                <Route path="ygosite/login" element={<LoginForm/>}/>
            </Routes>
            <Routes>
                {routesPath.map(path =>
                (
                    <Route path={`/ygosite/${path}`} element={<Footer/>}/>
                ))}
            </Routes>
        </Router>
    </>);
};

export default Index;