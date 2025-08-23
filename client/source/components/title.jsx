import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Title()
{
    const location = useLocation();
    useEffect(() =>
    {
        switch (location.pathname)
        {
            case "ygosite/home":
            {
                document.title = "Yu-Gi-Oh!Trading Card Game Website";
                break;
            }
            case "ygosite/tutorial":
            {
                document.title = "How to Play Yu-Gi-Oh";
                break;
            }
            case "ygosite/search":
            {
                document.title = "Search for Yu-Gi-Oh Cards";
            }
            default:
            {
                document.title = "Yu-Gi-Oh!Trading Card Game Website"
            }
        }
    },[location.pathname]);
};

export default Title;