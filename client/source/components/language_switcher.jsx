import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { useContext } from "react";
import { LanguageContext } from "./language.jsx";
import "../style/header.css";

function LanguageSwitcher()
{
    const { language, setLanguage, languageValue } = useContext(LanguageContext);
    function dropdown()
    {
        document.getElementsByClassName("language-value")[0].classList.toggle("show");
    };
    return (
    <>
        <div className="language-button-container">
            <h1 onClick={() => dropdown()}>
                {`${languageValue[language].label} `}
                <FontAwesomeIcon icon={faChevronDown}/>
            </h1>
            <div className="language-value">
                <p onClick={() => setLanguage("english")}>
                    English 
                </p>
                <p onClick={() => setLanguage("vietnamese")}>
                    Tiếng Việt
                </p>
            </div>
        </div>
    </>);
};

export default LanguageSwitcher;