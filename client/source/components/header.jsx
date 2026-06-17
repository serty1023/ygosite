import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./language.jsx";
import LanguageSwitcher from "./language_switcher.jsx";
import ThemeSwitcher from "./theme_switcher.jsx";
import "../style/header.css";

const loginText =
{
    english: 
    [
        "Login",
        "Log Out"
    ],
    vietnamese:
    [
        "Đăng Nhập",
        "Đăng Xuất"
    ]
};

function Header()
{
    const { language } = useContext(LanguageContext);
    const [headerContent,getHeaderContent] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/header",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getHeaderContent(data))
    },[]);

    const login = localStorage.getItem("login") || "0";

    function sign()
    {
        if (login == "0")
        {
            navigate("/ygosite/login")
        }
        else
        {
            localStorage.setItem("login","0");
            window.location.reload();
        }
    };

    return (
    <>
        <div className="header">
            <div className="logo-container">
                <img src="/source/images/LOGO.png" onClick={() => window.location.href = "/ygosite/home"}/>
            </div>
            <div className="menu">
                {headerContent.map((item,index) =>
                (
                    <h1 key={index} onClick={() => navigate(`/ygosite/${item.path}`)}>
                        {item[language]}
                    </h1>
                ))}
            </div>
            <div className="login">
                <h1 onClick={() => sign()}>
                    {loginText[language][login]}
                </h1>
            </div>
            <LanguageSwitcher/>
            <ThemeSwitcher/>
        </div>
    </>);
};

export default Header;