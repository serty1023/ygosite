import "../style/decks.css";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function Deck()
{
    const [deckData,getDeckData] = useState([]);
    const { name } = useParams();

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
        <div className="deck-banner">

        </div>
        <div className="deck-container">

        </div>
    </>);
};

export default Deck;