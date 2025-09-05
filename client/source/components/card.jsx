import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language.jsx";
import { cardID } from "../main";
import "../style/index.css";

function Card()
{
    const { language } = useContext(LanguageContext);
    const [card,getCardContent] = useState([]);
    const [cardLayout,getCardLayout] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/card_layout",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getCardLayout(data[language]))
    },[language]);

    useEffect(() =>
    {
        async function getCard()
        {
            try
            {
                const data = await (await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + cardID)).json();
                if (data.data && data.data.length > 0)
                {
                    getCardContent(data.data[0]);
                };
            }
            catch (error)
            {
                console.log("ERROR: ",error);
            }
            finally
            {
                setLoading(false)
            }
        };

        getCard();
    },[]);

    if (loading) return;

    card.desc = card.desc.replace(/(\r\n|\n|\r)/g,"<br>");
    card.desc = card.desc.replace("[ Pendulum Effect ]",`<b><i>-[Pendulum Effect]-</i></b>`);
    card.desc = card.desc.replace("[ Monster Effect ]",`<b><i>-[Monster Effect]-</i></b>`);

    const brs = (card.desc.match(/<br>/g) || []).length;

    let height = 95;
    if (card.desc.length < 200)
    {
        height = 80;
    }
    else if (card.desc.length > 800)
    {
        height = 115;
    }
    else if (card.desc.length > 700)
    {
        height = 105;
    }
    else if (card.desc.length > 600)
    {
        height = 100;
    };
    if (card.name.length >= 40)
    {
        height = height + 5;
    };
    if (card.name.length / brs >= 100)
    {
         height = height + 4 * brs; 
    }
    
    return (
    <>
        <div className="data-container" style={{height: `${height}vh`}}>
            <img src={card.card_images[0].image_url}/>
            <div className="card-information" style={{height: `calc(0.9 * ${height}vh)`}}>
                <h1 className="card-name">
                    {card.name}
                </h1>
                <div className="information-table">
                    <div className="information-grid" style={{gridColumn: "span 2"}}>
                        <p>
                            {card.type.includes("Monster") ? 
                            cardLayout[0][0]
                            : card.type.includes("Spell") ?
                            cardLayout[0][1]
                            : card.type.includes("Trap") ?
                            cardLayout[0][2]
                            : null}
                        </p>    
                        {card.humanReadableCardType}
                    </div>
                    <div className="information-grid">
                        <p>
                            {card.type.includes("Monster") ? 
                            cardLayout[1][0]
                            : card.type.includes("Spell") ?
                            cardLayout[1][1]
                            : card.type.includes("Trap") ?
                            cardLayout[1][2]
                            : null}
                        </p>
                        <div>
                            {card.type.includes("Monster") ? 
                            <>
                                <img src={`/source/images/${card.attribute}.png`}/>
                                {card.attribute}
                            </>
                            : card.race == "Normal" ? "Normal"
                            :
                            <>
                                <img src={`/source/images/${card.race}.png`}/>
                                {card.race}
                            </>}
                        </div>
                    </div>
                    {(card.type.includes("Monster") && !card.type.includes("Link")) ? 
                    <div className="information-grid">
                        <p>
                            {card.type.includes("XYZ") ?
                            cardLayout[2][1]
                            : cardLayout[2][0]}
                        </p>
                        <div>
                            {card.type.includes("XYZ") ?
                            <img src="/source/images/RANK.png"/> 
                            : <img src="/source/images/LEVEL.png"/>}
                            {card.level}
                        </div>
                    </div>
                    : null}
                    {card.type.includes("Pendulum") ?
                    <div className="information-grid">
                        <p>
                            {cardLayout[3]}
                        </p>
                        <div>
                            <img src="/source/images/SCALE.png"/>
                            {card.scale}
                        </div>
                    </div> 
                    : null}
                    {card.type.includes("Monster") ?
                    <>
                        <div className="information-grid">
                            <p>
                                {cardLayout[4]}
                            </p>
                            <div>
                                <img src={`/source/images/${card.race}.png`}/>
                                {card.race}
                            </div>
                        </div>
                        <div className="stats-grid" style={{gridColumn: "span 2"}}>
                            <div style={{width: "50%"}}>
                                <p>
                                    ATK
                                </p>
                                <p style={{color: "var(--black-color)"}}>
                                    {card.atk}
                                </p>
                            </div>
                            <div style={{width: "50%"}}>
                                {card.type.includes("Link") ? 
                                <> 
                                    <p>
                                        {cardLayout[5]}
                                    </p>
                                    <p style={{color: "var(--black-color)"}}>
                                        {card.linkval}
                                    </p>
                                </>
                                : <>
                                    <p>
                                        DEF
                                    </p>
                                    <p style={{color: "var(--black-color)"}}>
                                        {card.def}
                                    </p>
                                </>}
                            </div>
                        </div>
                    </>
                    : null}
                    <div className="information-grid" style={{gridColumn: "span 3",fontSize: "125%"}}>
                        <p style={{color: "var(--black-color)",textAlign: "justify",padding: "2vh"}} dangerouslySetInnerHTML={{ __html: card.desc}}></p>
                    </div>
                    <div className="banlist-info"style={{gridColumn: "span 3"}}>
                        {(!card.banlist_info) ? 
                        <>
                            <p>
                                TCG: Unlimited
                            </p>
                            <p>
                                OCG: Unlimited
                            </p>
                        </> 
                        : <>
                            <p>
                                TCG: {card.banlist_info.ban_tcg ? `${card.banlist_info.ban_tcg}` : "Unlimited"}
                            </p>
                            <p>
                                OCG: {card.banlist_info.ban_ocg ? `${card.banlist_info.ban_ocg}` : "Unlimited"}
                            </p>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Card;