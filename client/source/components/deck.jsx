import "../style/decks.css";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function Deck()
{
    const { id } = useParams();
    const [deckData,getDeckData] = useState({});
    const [cardData,getCardData] = useState({});

    useEffect(() =>
    {
        fetch(`http://localhost:3000/decks/${id}`)
        .then(response => response.json())
        .then(data => 
        {
            getDeckData(data);
        });
    },[id]);

    useEffect(() =>
    {   
        if (!deckData.main && !deckData.extra && !deckData.side) return;

        const cards = 
        [
            ...deckData.main || [],
            ...deckData.extra || [],
            ...deckData.side || []
        ];
        const idList = cards.join(",");

        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${idList}`)
        .then(response => response.json())
        .then(data =>
        {
            const cardsMap = {};
            data["data"].forEach(card =>
            {
                cardsMap[card.id] = card;
            });
            getCardData(
            {
                main: (deckData.main || []).map(id => cardsMap[id]),
                extra: (deckData.extra || []).map(id => cardsMap[id]),
                side: (deckData.side || []).map(id => cardsMap[id])
            });
        });
    },[deckData]);

    return (
    <>
        <div className="deck-banner">
            <div className="avatar">
                <img src={deckData.avatar}/>
            </div>
            <div className="deck-information">
                <h1>
                    {deckData.name}
                </h1>
                <h1>
                    {deckData.author || "Unknown"}
                </h1>
                <p>
                    {deckData.description}
                </p>
            </div>
        </div>
        <div style={{marginBottom:"10vh"}}>
            <div className="main-deck-container">
                <h1>
                    Main Deck {cardData.main && cardData.main.length > 0 ? `[${deckData.main.length}]` : null}
                </h1>
                {cardData.main ? cardData.main.map((card,index) =>
                (
                    <img key={index} src={card.card_images[0].image_url} loading="lazy" onClick={() => window.location.href = `/ygosite/cards?id=${card.id}`}/>
                )) : null}
            </div>
            <div className="extra-deck-container">
                <h1>
                    Extra Deck {cardData.extra && cardData.extra.length > 0 ? `[${deckData.extra.length}]` : null}
                </h1>
                {cardData.extra ? cardData.extra.map((card,index) =>
                (
                    <img key={index} src={card.card_images[0].image_url} loading="lazy" onClick={() => window.location.href = `/ygosite/cards?id=${card.id}`}/>
                )) : null}
            </div>
            <div className="side-deck-container">
                <h1>
                    Side Deck {cardData.side && cardData.side.length > 0 ? `[${deckData.side.length}]` : null}
                </h1>
                {cardData.extra ? cardData.side.map((card,index) =>
                (
                    <img key={index} src={card.card_images[0].image_url} loading="lazy" onClick={() => window.location.href = `/ygosite/cards?id=${card.id}`}/>
                )) : null}
            </div>
        </div>
    </>);
};

export default Deck;