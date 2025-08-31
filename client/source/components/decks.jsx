import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext,useEffect,useState } from "react";
import { LanguageContext } from "./language.jsx";
import "../style/decks.css";

const searchPlaceHolder =
{
    english: "Search",
    vietnamese: "Tìm Kiếm"
};

function Decks()
{
    const { language } = useContext(LanguageContext);
    const [deckData,getDeckData] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/decks",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => 
        {
            getDeckData(data);
        });
    },[]);

    return (
    <>
        <form className="decksearch">
            <div className="input">
                <input className="user-search" type="text" placeholder={searchPlaceHolder[language] + "..."}/>
                <button className="magnyfying-glass">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </form>
        <div className="decks-container">
            {deckData.map(deck => 
            (
                <div key={deck.id} className="deck" onClick={() => window.location.href = `/ygosite/decks/${deck.id}`}>
                    <img src={deck.avatar}/>
                    <div className="deck-information">
                        <h1 className="deck-name">
                            {deck.name}
                        </h1>
                        <p className="deck-description">
                            {deck.description}
                        </p>
                        <h1 className="author">
                            {deck.author ? deck.author : "Unknown"}
                        </h1>
                    </div>
                </div>
            ))}
        </div>
    </>);
};

export default Decks;