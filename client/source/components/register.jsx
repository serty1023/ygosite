import { useState,useContext } from "react";
import { LanguageContext } from "./language.jsx";
import "../style/login.css";

const loginForm =
{
    english:
    {
        label:
        {
            username: "USERNAME",
            password: "PASSWORD",
            confirm_password: "CONFIRM PASSWORD"
        },
        placeholder:
        {
            username: "Enter username...",
            password: "Enter password...",
            confirm_password: "Confirm password..."
        },
        text:
        { 
            question: "Already have an account? ",
            action: "Login!"
        },
        button: "CREATE ACCOUNT"
    },
    vietnamese:
    {
        label:
        {
            username: "TÊN TÀI KHOẢN",
            password: "MẬT KHẨU",
            confirm_password: "XÁC NHẬN MẬT KHẨU"
        },
        placeholder:
        {
            username: "Nhập tên tài khoản...",
            password: "Nhập mật khẩu...",
            confirm_password: "Xác nhận mật khẩu..."
        },
        text:
        { 
            question: "Đã có tài khoản? ",
            action: "Đăng Nhập!"
        },
        button: "TẠO TÀI KHOẢN"
    }
};

function RegisterForm()
{
    const { language } = useContext(LanguageContext);
    const [username,getUsername] = useState("");
    const [password,getPassword] = useState("");
    const [repassword,getRepassword] = useState("");

    const register = async (event) =>
    {
        event.preventDefault();

        try
        {
            const response = await fetch("http://localhost:3000/register",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    username: username,
                    password: password,
                    confirm_password: repassword
                }),
            });
            const results = await response.json();
            if (results == true)
            {
                window.alert("Created account successful! Login to continue...");
                window.location.href = "/ygosite/login";
            }
            else if (results == "userFound")
            {
                window.alert("Username was taken! Try another!");
            }
            else if (results == "notMatched")
            {
                window.alert("Password doesn't match! Please re-confirm!")
            }
            else if (results == "regexError")
            {
                window.alert("Password must be atleast 6 characters long, include atleast 1 letter and 1 number!")
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
            <form className="login-content" onSubmit={register}>
                <p>
                    {loginForm[language].label.username}
                </p>
                <input type="text" placeholder={loginForm[language].placeholder.username} onChange={(event) => getUsername(event.target.value)}/>
                <p>
                    {loginForm[language].label.password}
                </p>
                <input type="password" placeholder={loginForm[language].placeholder.password} onChange={(event) => getPassword(event.target.value)}/>
                <p>
                    {loginForm[language].label.confirm_password}
                </p>
                <input type="password" placeholder={loginForm[language].placeholder.confirm_password}  onChange={(event) => getRepassword(event.target.value)}/>
                <button>
                    {loginForm[language].button}
                </button>
                <p>
                    {loginForm[language].text.question}
                    <a href="/ygosite/login">
                        {loginForm[language].text.action}
                    </a>
                </p>
            </form>
        </div>
    </>);
};

export default RegisterForm;