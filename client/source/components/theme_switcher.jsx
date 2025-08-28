import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import "../style/header.css";

function ThemeSwitcher()
{
    return (
    <>
        <div className="dark-mode">
            <FontAwesomeIcon className="icon" icon={faMoon}/>
        </div>
    </>);
};

export default ThemeSwitcher;
