import { useContext,useEffect,useState } from "react";
import { LanguageContext } from "./language";
import "../style/home.css"

function Home()
{
    const { language } = useContext(LanguageContext);
    const [homepage,getHomePage] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/home",
        {
            headers: { "access": true }
        })
        .then(respone => respone.json())
        .then(data => getHomePage(data))
    },[language])

    useEffect(() => 
    {
        console.log(homepage);
    }, [homepage]);

    return (
    <>
        <div className="homepage">
            <div className="how-to-play item">
                <img src={homepage?.how_to_play?.image_source} alt=""/>
                <div className="background"></div>
                <div className="title">
                    <h1>
                        {homepage?.how_to_play?.title[language]}
                    </h1>
                </div>
            </div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
            <div style={{backgroundColor: "black"}}></div>
        </div>
    </>)
};

export default Home;