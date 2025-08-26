import "../style/decks.css";
import { useEffect,useState } from "react";

function Decks()
{
    const [deckData,getDeckData] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/decks")
        .then(response => response.json())
        .then(data => 
        {
            getDeckData(data["decks"]);
        });
    },[]);

    return (
    <>
        <div className="decks-container">
            {deckData.map(deck => 
            (
                <div key={deck.id} className="deck" onClick={() => window.location.href = `/ygosite/decks/${deck.name.toLowerCase()}[${deck.id}]`}>
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