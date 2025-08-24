import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faQuoteLeft,faQuoteRight,faGears,faFilter } from "@fortawesome/free-solid-svg-icons";
import { language,mode } from "../main.jsx";
import "../style/search.css";
import Filterbar from "./filterbar.jsx";

const searchPlaceHolder =
{
    english: "Search",
    vietnamese: "Tìm Kiếm"
};

const modeList =
[
    "matched-search",
    "card-text-search",
    "advanced-search",
    "filter-search"
];

function Search()
{
    function modeSwitch(mode)
    {
        window.location.href = "/ygosite/search?mode=" + mode;
    };

    if (!modeList.includes(mode))
    {
        window.location.href = "/ygosite/search?mode=matched-search";
    };

    const [searchbarContent,getSearchbarContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface")
        .then(response => response.json())
        .then(data => getSearchbarContent(data["search_options"]["search-options"][language]))
    },[]);

    const [inputValue,setInputValue] = useState("");
    const [filterValue,setFilterValue] = useState([]);
    const [results,getResults] = useState([]);
    const [posted,postedCheck] = useState(false)
    const postInput = async (event) =>
    {
        event.preventDefault();

        const filter = filterValue.reduce((acc,cur) =>
        {
            if (!acc[cur.title])
            {
                acc[cur.title] = [];
            }
            acc[cur.title].push(cur.value);
            return acc;
        },{});

        try 
        {
            const response = await fetch("http://localhost:3000/search",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    input:inputValue,
                    filterValue:filter,
                    mode
                }),
            });
            const results = await response.json();
            getResults(results);
            postedCheck(true);
            console.log(results);
        }
        catch (error)
        {
            console.log("ERROR",error);
        };
    };

    return (
    <>
        <div className="search-options">
            {searchbarContent.map((option,index) =>
            (
                <div key={index} className={`${option.mode} ${option.mode == mode ? "light-gray" : ""}`} onClick={() => modeSwitch(option.mode)}>
                    <div className="title">
                        {option.mode == "matched-search" ? 
                        <>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{transform: "scaleX(-1)"}}/>
                            <h1>
                                {option.title}
                            </h1>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </>
                        : option.mode == "card-text-search" ?
                        <>
                            <FontAwesomeIcon icon={faQuoteLeft}/>
                            <h1>
                                {option.title}
                            </h1>
                            <FontAwesomeIcon icon={faQuoteRight}/>
                        </> 
                        : option.mode == "advanced-search" ?
                        <>
                            <FontAwesomeIcon icon={faGears}/>
                            <h1>
                                {option.title}
                            </h1>
                            <FontAwesomeIcon icon={faGears} style={{transform: "scaleX(-1)"}}/>
                        </>
                        : option.mode == "filter-search" ? 
                        <>
                            <FontAwesomeIcon icon={faFilter}/>
                            <h1>
                                {option.title}
                            </h1>
                        </> : null}
                    </div>
                    <p>
                        {option.content}
                    </p>
                </div>
            ))}
        </div>
        <form className="searchbar" onSubmit={postInput}>
            <div className="input">
                <input className="user-search" type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder={searchPlaceHolder[language] + "..."}/>
                <button className="magnyfying-glass">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
            {mode == "filter-search" ? <Filterbar filterValue={filterValue} setFilterValue={setFilterValue}/>
            : null}
        </form>
        <div className="results"
        style={{justifyContent: results.length == 0 ? "center" : "start"}}>
            {posted && results.length == 0 ? 
            <h1>
                No Cards Found
            </h1>
            : 
            results.map(card => 
            (
                <img key={card.id} src={card.card_images[0].image_url} loading="lazy" onClick={() => window.location.href = `/ygosite/cards?id=${card.id}`}/>
            ))}
        </div>
    </>);
};

export default Search;