import "../style/decks.css";
import deckData from "/Users/serty1023/Documents/YGOSITE/server/data/decks.json";

function Decks()
{
    return (
    <>
        <div className="decks-container">
            {deckData.decks.map(deck => 
            (
                <div key={deck.id} className="deck">
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