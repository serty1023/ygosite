import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import { useParams } from "react-router-dom";
import { Link,Navigate } from "react-router-dom";
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
        return <Navigate to={"/ygosite/tutorial/basic"} replace/>
    }
    else if (tutorialsContent.tutorials && !tutorialsContent.tutorials[section])
    {
        return <Navigate to={"/ygosite/tutorial/basic"} replace/>
    };

    if (page && tutorialsContent.tutorials?.[section] && !tutorialsContent.tutorials[section][page])
    {
        return <Navigate to={"/ygosite/tutorial/basic"} replace/>
    };

    let sectionData = tutorialsContent.tutorials?.[section],pageData;
    if (page)
    {
        pageData = sectionData?.[page]
    };

    return (
    <>
        <div className="navigation">
            {tutorialsContent.navigation?.map((part,index) => 
            (
                <>
                    <h1 key={index} className={part.id}>
                        <Link className={`${section == part.id && !page ? "active" : ""}`} to={`/ygosite/tutorial/${part.id}`}>
                            {part.title}
                        </Link>
                    </h1>
                    {part.content?.map((content,index) =>    
                    (
                        <h2 key={index} className={content.id}>
                            <Link className={`${page == content.id ? "active" : ""}`} to={`/ygosite/tutorial/${part.id}/${content.id}`}>
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
                    <h2 className={pageData?.id}>
                        {pageData?.title}
                    </h2>
                    {pageData?.content.map(item =>
                    {
                        if (item.type == "text")
                        {
                            return item.text.map((text,i) => 
                            {
                                const parts = text.split(/(\[\{.*?\}\]|\{\[.*?]\})/g);
                                
                                return (
                                <h3 key={i}>
                                    {parts.map((part,i) => 
                                    {
                                        const linkWord = part.match(/\[\{(.*?)\|(.*?)\}\]/);
                                        const linkCard = part.match(/\{\[(.*?)\|(.*?)\]\}/);

                                        if (linkWord)
                                        {
                                            if (linkWord[2].startsWith("search:"))
                                            {
                                                const keyword = linkWord[2].slice(7);

                                                return (
                                                <Link 
                                                to={"/ygosite/card_search?mode=matched-search"}
                                                state={{ input:keyword }}>
                                                    {linkWord[1]}
                                                </Link>)
                                            };
                                            return (
                                            <Link to={`/ygosite/tutorial/${linkWord[2]}`}>
                                                {linkWord[1]}
                                            </Link>)
                                        };
                                        if (linkCard)
                                        {
                                            return (
                                            <Link to={`/ygosite/cards?id=${linkCard[2]}`}>
                                                {linkCard[1]}
                                            </Link>)
                                        };

                                        return part
                                    })}
                                </h3>)})
                        }
                        else if (item.type == "large-image")
                        {
                            return (
                            <div className="large-img">
                                {item.source.map((source, i) => 
                                (
                                    <img key={i} src={source}/>
                                ))}
                            </div>)
                        }
                        else if (item.type == "medium-image")
                        {
                            return (
                            <div className="medium-img">
                                {item.source.map((source, i) => 
                                (
                                    <img key={i} src={source}/>
                                ))}
                            </div>)
                        }
                        else if (item.type == "small-image")
                        {
                            return (
                            <div className="small-img">
                                {item.source.map((source, i) => 
                                (
                                    <img key={i} src={source}/>
                                ))}
                            </div>)
                        }
                        else if (item.type == "video")
                        {
                            return (
                            <div className="video">
                                {item.source.map((source, i) => 
                                (
                                    <video key={i} src={source} controls/>
                                ))}
                            </div>)
                        }
                        else if (item.type == "icon")
                        {
                            return (
                            <div className="icons">
                                {item.content.map((c,i) => 
                                (
                                    <div key={i} className="icon">
                                        <img src={c.source} alt=""/>
                                        <h4>
                                            {c.text}
                                        </h4>
                                    </div>
                                ))}
                            </div>)
                        };
                    })}
                </>
            :<>
                <h1 className={sectionData?.id}>
                    {sectionData?.title}
                </h1>
                {
                    Object.entries(sectionData || {})
                    .filter(([key]) => key != "id" && key != "title")
                    .map(([key]) =>
                    (
                        <>
                            <h2>
                                {sectionData[key].title}
                            </h2>
                            {
                                sectionData[key].content.map(item => 
                                {
                                    if (item.type == "text")
                                    {
                                        return item.text.map((text,i) => 
                                        {
                                            const parts = text.split(/(\[\{.*?\}\]|\{\[.*?]\})/g);
                                            
                                            return (
                                            <h3 key={i}>
                                                {parts.map((part,i) => 
                                                {
                                                    const linkWord = part.match(/\[\{(.*?)\|(.*?)\}\]/);
                                                    const linkCard = part.match(/\{\[(.*?)\|(.*?)\]\}/);

                                                    if (linkWord)
                                                    {
                                                        if (linkWord[2].startsWith("search:"))
                                                        {
                                                            const keyword = linkWord[2].slice(7);

                                                            return (
                                                            <Link 
                                                            to={"/ygosite/card_search?mode=matched-search"}
                                                            state={{ input:keyword }}>
                                                                {linkWord[1]}
                                                            </Link>)
                                                        };
                                                        return (
                                                        <Link to={`/ygosite/tutorial/${linkWord[2]}`}>
                                                            {linkWord[1]}
                                                        </Link>)
                                                    };
                                                    if (linkCard)
                                                    {
                                                        return (
                                                        <Link to={`/ygosite/cards?id=${linkCard[2]}`}>
                                                            {linkCard[1]}
                                                        </Link>)
                                                    };

                                                    return part
                                                })}
                                            </h3>)})
                                    }
                                    else if (item.type == "large-image")
                                    {
                                        return (
                                        <div className="large-img">
                                            {item.source.map((source, i) => 
                                            (
                                                <img key={i} src={source}/>
                                            ))}
                                        </div>)
                                    }
                                    else if (item.type == "medium-image")
                                    {
                                        return (
                                        <div className="medium-img">
                                            {item.source.map((source, i) => 
                                            (
                                                <img key={i} src={source}/>
                                            ))}
                                        </div>)
                                    }
                                    else if (item.type == "small-image")
                                    {
                                        return (
                                        <div className="small-img">
                                            {item.source.map((source, i) => 
                                            (
                                                <img key={i} src={source}/>
                                            ))}
                                        </div>)
                                    }
                                    else if (item.type == "video")
                                    {
                                        return (
                                        <div className="video">
                                            {item.source.map((source, i) => 
                                            (
                                                <video key={i} src={source} controls/>
                                            ))}
                                        </div>)
                                    }
                                    else if (item.type == "icon")
                                    {
                                        return (
                                        <div className="icons">
                                            {item.content.map((c,i) => 
                                            (
                                                <div key={i} className="icon">
                                                    <img src={c.source} alt=""/>
                                                    <h4>
                                                        {c.text}
                                                    </h4>
                                                </div>
                                            ))}
                                        </div>)
                                    };
                                })
                            }
                        </>
                    ))
                }
            </>}
        </div>
    </>);
};

export default Tutorials;