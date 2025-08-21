import { useState,useEffect } from "react";
import { language } from "../main";
import "../style/index.css";

function Introduction()
{
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