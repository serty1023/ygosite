import { useLocation,useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";

function Title()
{
    const [card,getCardContent] = useState([]);
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const cardID = searchParams.get("id")

    async function getCard()
    {
        if (!cardID) return;

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
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        switch (location.pathname)
        {
            case "/ygosite/home":
            {
                document.title = "Yu-Gi-Oh!Trading Card Game Website";
                break;
            }
            case "/ygosite/tutorial":
            {
                document.title = "How to Play Yu-Gi-Oh";
                break;
            }
            case "/ygosite/search":
            {
                document.title = "Search for Yu-Gi-Oh Cards";
                break;
            }
            case "/ygosite/cards":
            {
                getCard();
                break;
            }
            default:
            {
                document.title = "Yu-Gi-Oh!Trading Card Game Website"
            }
        };
    },[location.pathname]);

    useEffect(() => 
    {
        if (card.name && location.pathname == "/ygosite/cards") {
            document.title = card.name;
        }
    }, [card, location.pathname]);

    if (loading) return;
};

export default Title;