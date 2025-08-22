import "../style/decks.css";
import deckData from "/Users/serty1023/Documents/YGOSITE/server/data/decks.json";

function Decks()
{
    return (
    <>
        <div className="decks-container">
            {deckData.decks.map(deck => 
            (
                <h1>
                    {deck.name}
                </h1>
            ))}
        </div>
    </>);
};

export default Decks;