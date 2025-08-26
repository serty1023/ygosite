import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { LanguageProvider }from "./components/language.jsx";
import Index from "./index.jsx";

const login = localStorage.getItem("login");
if (!login || (login != "0" && login != "1"))
{
    localStorage.setItem("login","0");
};

const params = new URLSearchParams(window.location.search);
const cardID = params.get("id");
export { login,cardID };

createRoot(document.getElementById("blank")).render(
    <StrictMode>
        <LanguageProvider>
            <Index/>
        </LanguageProvider>
    </StrictMode>
);