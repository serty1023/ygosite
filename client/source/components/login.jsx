import { useState,useEffect } from "react";
import { language } from "../main.jsx";
import "../style/login.css";

const loginForm =
{
    english:
    {
        label:
        {
            username: "USERNAME",
            password: "PASSWORD",
        },
        placeholder:
        {
            username: "Enter username...",
            password: "Enter password..."
        },
        text:
        { 
            question: "Don't have an account? ",
            action: "Create one!"
        },
        alert: "Wrong username or password",
        button: "LOGIN"
    },
    vietnamese:
    {
        label:
        {
            username: "TÊN TÀI KHOẢN",
            password: "MẬT KHẨU",
        },
        placeholder:
        {
            username: "Nhập tên tài khoản...",
            password: "Nhập mật khẩu..."
        },
        text:
        { 
            question: "Không có tài khoản? ",
            action: "Tạo tài khoản!"
        },
        alert: "Sai tên tài khoản hoặc mật khẩu",
        button: "ĐĂNG NHẬP"
    }
};

function LoginForm()
{
    const [username,getUsername] = useState("");
    const [password,getPassword] = useState("");

    const login = async (event) =>
    {
        event.preventDefault();

        try
        {
            const response = await fetch("http://localhost:3000/login",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    username: username,
                    password: password
                }),
            });
            const results = await response.json();
            if (results == true)
            {
                window.location.href = "/ygosite/home";
                localStorage.setItem("login",1);
            }
            else
            {
                window.alert(loginForm[language].alert);
            };
        }
        catch (error)
        {
            console.log("ERROR: ",error);
        };
    };

    return (
    <>
        <div className="login-container">
            <div className="logo-container">
                <img src="/source/images/LOGO.png" onClick={() => window.location.href = "/ygosite/home"}/>
            </div>
            <form className="login-content" onSubmit={login}>
                <p>
                    {loginForm[language].label.username}
                </p>
                <input type="text" placeholder={loginForm[language].placeholder.username} onChange={(event) => getUsername(event.target.value)}/>
                <p>
                    {loginForm[language].label.password}
                </p>
                <input type="password" placeholder={loginForm[language].placeholder.password} onChange={(event) => getPassword(event.target.value)}/>
                <button>
                    {loginForm[language].button}
                </button>
                <p>
                    {loginForm[language].text.question}
                    <a href="/ygosite/register">
                        {loginForm[language].text.action}
                    </a>
                </p>
            </form>
        </div>
    </>);
};

export default LoginForm;