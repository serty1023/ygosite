import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { useContext,useEffect } from "react";
import { LanguageContext } from "./language.jsx";
import "../style/header.css";

function LanguageSwitcher()
{
    const { language, setLanguage, languageValue } = useContext(LanguageContext);
    useEffect(() =>
    {
        function handleClick(element)
        {
            const dropdown = document.getElementsByClassName("language-button-container")[0];
            if (dropdown && !dropdown.contains(element.target))
            {
                document.getElementsByClassName("language-value")[0].classList.remove("show");
            };
        };
        document.addEventListener("click",handleClick);
        return () => document.removeEventListener("click",handleClick);
    });
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
                <p onClick={() => 
                {
                    setLanguage("english");
                    document.getElementsByClassName("language-value")[0].classList.toggle("show");
                }}>
                    English 
                </p>
                <p onClick={() => 
                {
                    setLanguage("vietnamese");
                    document.getElementsByClassName("language-value")[0].classList.toggle("show");
                }}>
                    Tiếng Việt
                </p>
            </div>
        </div>
    </>);
};

export default LanguageSwitcher;