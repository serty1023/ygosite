import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import "../style/tutorial.css";

function Tutorials()
{
    const { language } = useContext(LanguageContext);
    const [tutorialsContent,getTutorialContent] = useState({});

    useEffect(() =>
    {
        fetch(`http://localhost:3000/interface/tutorials/${language}`,
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getTutorialContent(data))
    },[language]);

    console.log(tutorialsContent.navigation);

    return (
    <>
        <div className="navigation">
            {tutorialsContent.navigation?.map((part,index) => 
            (
                <>
                    <h1 key={index} className={part.id}>
                        {part.title}
                    </h1>
                    {part.content?.map((content,index) =>    
                    (
                        <h2 key={index} className={content.id}>
                            • {content.title}
                        </h2>
                    ))}
                </>
            ))}
        </div>
    </>);
};

export default Tutorials;