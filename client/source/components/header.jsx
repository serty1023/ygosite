import { useState,useEffect } from "react";
import { language,login } from "../main.jsx";
import LanguageSwitcher from "./language_switcher.jsx";
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
}

function sign()
{
    if (login == 0)
    {
        window.location.href = "/ygosite/login"
    }
    else
    {
        localStorage.setItem("login",0);
        window.location.reload();
    }
}

function Header()
{
    const [headerContent,getHeaderContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface")
        .then(response => response.json())
        .then(data => getHeaderContent(data["header"].header))
    },[]);

    return (
    <>
        <div className="header">
            <div className="logo-container">
                <img src="/source/images/LOGO.png" onClick={() => window.location.href = "/ygosite/home"}/>
            </div>
            <div className="menu">
                {headerContent.map((item,index) =>
                (
                    <a key={index} href={`/ygosite/${item.path}`}>
                        {item[language]}
                    </a>
                ))}
            </div>
            <div className="login">
                <a onClick={() => sign()}>
                    {loginText[language][login]}
                </a>
            </div>
            <LanguageSwitcher/>
        </div>
    </>);
};

export default Header;