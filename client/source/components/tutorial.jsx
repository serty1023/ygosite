import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import "../style/tutorial.css";

function Tutorials()
{
    const { language } = useContext(LanguageContext);
    const [tutorialsContent,getTutorialContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/tutorials",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getTutorialContent(data[language]))
    },[language]);

    return (
    <>
        <div className="tutorials">
            {tutorialsContent.map(part => 
            (
                <div key={part.id} className={`indent-${part.indent}`}>
                    <h1>
                        {part.title}
                    </h1>
                    {part.descriptions.map((desc,index) => 
                    {
                        if (desc.type == "text")
                        {
                            return <p key={index} dangerouslySetInnerHTML={{ __html: desc.content}}></p>;
                        }
                        else if (desc.type == "image")
                        {
                            const width = 
                                desc.size == "small" 
                                ? "30%"
                                : desc.size == "medium" 
                                ? "40%"
                                : "60%";
                            return (
                                <div key={index} className="image-container">
                                    {desc.content.map((image,i) => 
                                    (
                                        <img key={i} src={`/source/images/${image}.png`} style={{ width }} alt={`${image}`}/>
                                    ))}
                                </div>
                            );
                        }
                        else if (desc.type == "icon")
                        {
                            return (
                                <div key={index} className="icon-container">
                                    {desc.content.map((icon,i) =>
                                    (
                                        <div key={i} className="icon-div">
                                            <img src={`/source/images/${icon}.png`} alt={`${icon}`}/>
                                            <p>{icon}</p>
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        else if (desc.type == "video")
                        {
                            return (
                                <video key={index} src={`/source/videos/${desc.content}.mp4`} controls></video>
                            );
                        };
                        return null;
                    })};
                </div>
            ))};
        </div>
    </>);
};

export default Tutorials;