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
                <p>
                    {loginForm[language].label.confirm_password}
                </p>
                <input type="password" placeholder={loginForm[language].placeholder.confirm_password}/>
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