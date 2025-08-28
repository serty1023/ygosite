import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./theme";
import "../style/header.css";

function ThemeSwitcher()
{
    const { theme,setTheme } = useContext(ThemeContext);
    return (
    <>
        <div className="dark-mode">
            <FontAwesomeIcon className="icon" icon={faMoon} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
        </div>
    </>);
};

export default ThemeSwitcher;
