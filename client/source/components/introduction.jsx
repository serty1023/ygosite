import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import "../style/index.css";

function Introduction()
{
    const { language } = useContext(LanguageContext);
    const [introductionContent,getIntroductionContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface")
        .then(response => response.json())
        .then(data => getIntroductionContent(data["introduction"].introduction))
    },[]);

    return (
    <>
        <div className="introduction">
            <p>
                {introductionContent[language]}
            </p>
        </div>   
    </>
    );
};

export default Introduction;