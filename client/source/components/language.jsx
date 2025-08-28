import { createContext,useEffect,useState } from "react";

const LanguageContext = createContext();

function LanguageProvider({ children })
{
    const languageValue =
    {
        english:
        {
            value: "english",
            label: "English"
        },
        vietnamese:
        {
            value: "vietnamese",
            label: "Tiếng Việt"
        }
    };

    const [language,setLanguage] = useState(() =>
    {
        const language_value = localStorage.getItem("language");
        return languageValue[language_value] ? language_value : "english";
    });

    useEffect(() =>
    {
        localStorage.setItem("language",language);
    },[language]);

    return (
        <LanguageContext.Provider value={{ language,setLanguage,languageValue }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext,LanguageProvider };