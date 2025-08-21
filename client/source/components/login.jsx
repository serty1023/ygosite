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
            question: "Không có tài khoản ",
            action: "Tạo tài khoản!"
        },
        button: "ĐĂNG NHẬP"
    }
};

function LoginForm()
{
    return (
    <>
        <div className="login-container">
            <div className="logo-container">
                <img src="/source/images/LOGO.png" onClick={() => window.location.href = "/ygosite/home"}/>
            </div>
            <form className="login-content">
                <p>
                    {loginForm[language].label.username}
                </p>
                <input type="text" placeholder={loginForm[language].placeholder.username}/>
                <p>
                    {loginForm[language].label.password}
                </p>
                <input type="password" placeholder={loginForm[language].placeholder.password}/>
                <button>
                    {loginForm[language].button}
                </button>
                <p>
                    {loginForm[language].text.question}
                    <a href="">
                        {loginForm[language].text.action}
                    </a>
                </p>
            </form>
        </div>
    </>);
};

export default LoginForm;