import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../style/home.css"

function Home()
{
    const { language } = useContext(LanguageContext);
    const [homepage,getHomePage] = useState([]);
    const navigate = useNavigate();

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
            <div className="how-to-play item" onClick={() => navigate("/ygosite/tutorial/base")}>
                <img src={homepage?.how_to_play?.image_source} alt=""/>
                <div className="title-background"></div>
                <div className="title">
                    <h1>
                        {homepage?.how_to_play?.title[language]}
                    </h1>
                </div>
            </div>
            <div className="card-search item" onClick={() => navigate("/ygosite/card_search?mode=matched-search")}>
                <img src={homepage?.card_search?.image_source} alt=""/>
                <div className="title-background"></div>
                <div className="title">
                    <h1>
                        {homepage?.card_search?.title[language]} <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </h1>
                </div>
            </div>
        </div>
    </>)
};

export default Home;