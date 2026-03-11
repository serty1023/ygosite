import { useState } from "react";

function Results({posted,results,total})
{
    const [page,getPage] = useState(1);
    const pageSize = 27;

    const start = (page - 1) * pageSize;
    const resultsPage = results.slice(start,start + pageSize);

    return (
    <>
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
        <div className="pagination">

        </div>
    </>)
};

export default Results;