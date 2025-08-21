import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { languageLabel,language } from "../main";
import "../style/header.css";

function LanguageSwitcher()
{
    function dropdown()
    {
        document.getElementsByClassName("language-value")[0].classList.toggle("show");
    };
    function setLanguage(language_value)
    {
        localStorage.setItem("language",language_value);
        window.location.reload();
    };
    return (
    <>
        <div className="language-button-container">
            <h1 onClick={() => dropdown()}>
                {`${languageLabel[language]} `}
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