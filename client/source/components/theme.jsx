import { createContext,useState,useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children })
{
    const [theme,setTheme] = useState(() =>
    {
        const theme = localStorage.getItem("theme");
        return theme || "dark";
    });

    useEffect(() =>
    {
        localStorage.setItem("theme",theme);
    },[theme]);
    
    return (
    <>
        <ThemeContext.Provider value={{ theme,setTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    </>);
};

export { ThemeContext,ThemeProvider };