import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft,faCaretRight } from "@fortawesome/free-solid-svg-icons";

function Results({posted,results,total})
{
    const [page,getPage] = useState(1);
    const pageSize = 27;

    const start = (page - 1) * pageSize;
    const resultsPage = results.slice(start,start + pageSize);
    const totalPage = Math.ceil(results.length/pageSize)

    let startPage,endPage;
    if (totalPage <= 7)
    {
        startPage = 1;
        endPage = totalPage;
    }
    else if (page <= 4)
    {
        startPage = 1;
        endPage = 7;
    }
    else if (page >= totalPage - 3)
    {
        startPage = totalPage - 6;
        endPage = totalPage;
    }
    else
    {
        start = page - 2;
        end = page + 2;
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++)
    {
        pages.push(i);
    };

    return (
    <>
        <div className="pagination" page={page}>
            {totalPage >= 2 && posted ? 
            <>
            <h1>
                <FontAwesomeIcon icon={faCaretLeft}/>
            </h1>
            {pages.map(p =>
            (
                <p>
                    {p}
                </p>
            ))}
            <h1>
                <FontAwesomeIcon icon={faCaretRight}/>
            </h1>
            </>
            : null}
        </div>
        <div className="results"
        style={{justifyContent: results.length == 0 ? "center" : "start"}}>
            {posted ? 
            <h1>
                Found {`${results.length}/${total} cards`}
            </h1>
            : null}
            {resultsPage.map(card => 
            (
                <img key={card.id} src={card.card_images[0].image_url} loading="lazy" onClick={() => window.location.href = `/ygosite/cards?id=${card.id}`}/>
            ))}
        </div>
    </>)
};

export default Results;