import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import Index from "./index.jsx";

const languageLabel = 
{
    english: "English",
    vietnamese: "Tiếng Việt"
};

const language = localStorage.getItem("language");
if (!language || !languageLabel[language])
{
    localStorage.setItem("language","english");
    window.location.reload();
};
const login = localStorage.getItem("login");
if (!login || (login != 0 && login != 1))
{
    localStorage.setItem("login",0);
};

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const cardID = params.get("id");
export { languageLabel,language,login,mode,cardID };

createRoot(document.getElementById("blank")).render(
    <StrictMode>
        <Index/>
    </StrictMode>
);