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

    if (!section)
    {
        window.location.href = "/ygosite/tutorial/basic";
    }
    else if (tutorialsContent.tutorials && !tutorialsContent.tutorials[section])
    {
        window.location.href = "/ygosite/tutorial/basic";
    };

    if (page && tutorialsContent.tutorials?.[section] && !tutorialsContent.tutorials[section][page])
    {
        window.location.href = `/ygosite/tutorial/${section}`
    };

    let sectionData = tutorialsContent.tutorials?.[section],pageData;
    if (page)
    {
        pageData = sectionData?.[page]
    };
    console.log(pageData);

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
            {pageData?
                <>
                    <h1 id={pageData?.id}>
                        {pageData?.title}
                    </h1>
                    {pageData?.content.map((item,index) =>
                    {
                        if (item.type == "text")
                        {
                            return item.text.map((text,i) => 
                            (
                                <h2 key={i}>
                                    {text}
                                </h2>
                            ))
                        }
                        else if (item.type == "large-image")
                        {
                            return (<div className="large-img">
                                <img src={item.source[0]} alt=""/>
                            </div>)
                        };
                    })}
                </>
            :null}
        </div>
    </>);
};

export default Tutorials;