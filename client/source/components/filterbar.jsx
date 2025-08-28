import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";

const iconTitle =
[
    "Type",
    "Attribute",
    "Spell/Trap Icon",
    "Monster Type"
];

function Filterbar( {filterValue,setFilterValue} )
{
    const { language } = useContext(LanguageContext);
    const [filterbarContent,getFilterbarContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/filterbar",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getFilterbarContent(data))
    },[]);

    return (
    <>
        <div className="filterbar">
            {filterbarContent.map((bar,index) =>
            (
                <div key={index} className="bar">
                    <div className="title">
                        <h1>
                            {bar.title[language]}
                        </h1>
                    </div>
                    <div key={index} className={bar.title.english == "Monster Type" ? "button-grid-1" : "button-grid"}>
                        {bar.buttons.map(button => 
                        (
                            <button key={button} type="button" onClick={(e) => 
                            {
                                e.currentTarget.classList.toggle("clicked");
                                console.log(filterValue || {title:bar.title.english,value:button});
                                setFilterValue(objects =>
                                {
                                    const exist = objects.find(f => f.title == bar.title.english && f.value == button)
                                    if (exist)
                                    {
                                        return objects.filter(f => !(f.title == bar.title.english && f.value == button));
                                    }
                                    else
                                    {
                                        return [...objects,
                                        {
                                            title: bar.title.english,
                                            value: button
                                        }];
                                    };
                                });

                            }}>
                                {iconTitle.includes(bar.title.english) ? 
                                ((button != "Normal" && button != "Monster") ?
                                <>
                                    <img src={`/source/images/${button}.png`}/>
                                    {button}
                                </> 
                                : <>{button}</>
                                ) 
                                : <>{button}</>}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </>);
};

export default Filterbar;