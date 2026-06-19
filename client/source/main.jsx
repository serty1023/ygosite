import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { LanguageProvider }from "./components/language.jsx";
import { ThemeProvider } from "./components/theme.jsx";
import Index from "./index.jsx";

const login = localStorage.getItem("login");
if (!login || (login != "0" && login != "1"))
{
    localStorage.setItem("login","0");
};

export { login };

createRoot(document.getElementById("blank")).render(
    <StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <Index/>
            </ThemeProvider>
        </LanguageProvider>
    </StrictMode>
);