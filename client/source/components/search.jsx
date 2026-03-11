import { useNavigate,useSearchParams } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faQuoteLeft,faQuoteRight,faGears,faFilter } from "@fortawesome/free-solid-svg-icons";
import "../style/search.css";
import Filterbar from "./filterbar.jsx";
import Results from "./results.jsx";

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
    const { language } = useContext(LanguageContext);
    const [searchbarContent,getSearchbarContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface/search_options",
        {
            headers: {"access":"true"}
        })
        .then(response => response.json())
        .then(data => getSearchbarContent(data[language]))
    },[language]);

    const [inputValue,setInputValue] = useState("");
    const [filterValue,setFilterValue] = useState([]);
    const [results,getResults] = useState([]);
    const [total,getTotal] = useState([])
    const [posted,postedCheck] = useState(false);
    const [searching,searchingState] = useState(false);
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
            searchingState(true);
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
            getResults(results[0]);
            getTotal(results[1]);
            postedCheck(true);
            //console.log(results[0]);
        }
        catch (error)
        {
            console.log("ERROR",error);
        }
        finally
        {
            searchingState(false);
        };
    };

    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const navigate = useNavigate();

    function modeSwitch(mode)
    {
        setInputValue([]);
        setFilterValue([]);
        navigate(`/ygosite/search?mode=${mode}`);
    };

    if (!modeList.includes(mode))
    {
        navigate("/ygosite/search?mode=matched-search");
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
        {searching ? 
        <h1 style={{color:"white"}}>
            Searching...
        </h1> 
        : null}
        <Results posted={posted} results={results} total={total}/>
    </>);
};

export default Search;