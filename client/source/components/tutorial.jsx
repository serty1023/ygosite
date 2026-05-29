import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/tutorial.css";

function Tutorials()
{
    const { language } = useContext(LanguageContext);
    const [tutorialsContent,getTutorialContent] = useState({});
    const { section,page } = useParams();

    useEffect(() =>
    {
        fetch(`http://localhost:3000/interface/tutorials/${language}`,
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getTutorialContent(data))
    },[language]);

    const currentSection = tutorialsContent.navigation?.find(item => item.id == section);

    return (
    <>
        <div className="navigation">
            {tutorialsContent.navigation?.map((part,index) => 
            (
                <>
                    <h1 key={index} className={part.id}>
                        <Link to={`/ygosite/tutorial/${part.id}`}>
                            {part.title}
                        </Link>
                    </h1>
                    {part.content?.map((content,index) =>    
                    (
                        <h2 key={index} className={content.id}>
                            <Link to={`/ygosite/tutorial/${part.id}/${content.id}`}>
                                • {content.title}
                            </Link>
                        </h2>
                    ))}
                </>
            ))}
        </div>
        <div className="tutorials">
            {

            }
        </div>
    </>);
};

export default Tutorials;