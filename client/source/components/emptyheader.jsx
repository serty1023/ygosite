import { language } from "../main.jsx";
import LanguageSwitcher from "./language_switcher.jsx";
import "../style/login.css";

function EmptyHeader()
{
    return (
    <>
        <div className="empty-header">
            <div className="space"></div>
            <LanguageSwitcher/>
        </div>
    </>);
};

export default EmptyHeader;