const axios = require("axios");

function levenshteinDistance(a,b)
{
    const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));

    for (let i = 0;i <= a.length;i++)
    {
        matrix[i][0] = i;
    };
    for (let j = 0;j <= b.length;j++)
    {
        matrix[0][j] = j;
    };

    for (let i = 1;i <= a.length;i++)
    {
        for (let j = 1; j <= b.length; j++)
        {
            const cost = a[i-1] === b[j-1] ? 0:1;
            matrix[i][j] = Math.min(
                matrix[i-1][j] + 1,
                matrix[i][j-1] + 1,
                matrix[i-1][j-1] + cost
            );
        };
    };
    return matrix[a.length][b.length];
};

function cartesianProduct(arrays)
{
    return arrays.reduce((acc,curr) => 
    {
        const response = [];
        acc.forEach(a =>
        {
            curr.forEach(b =>
            {
                response.push([...a,b])
            });
        });
        return response;
    },[[]]);
};

let cardData = null;
let filterbarContent = null;

async function getCards()
{
    if (!cardData)
    {
        cardData = (await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php")).data.data;
        for (let i = cardData.length - 1;i >= 0;i--)
        {
            if (cardData[i].type == "Skill Card" || cardData[i].type == "Token" || !cardData[i].card_sets)
            {
                cardData.splice(i,1);
            };
        };
    };
    return cardData;
};

async function search(input,filterValue,mode)
{
    let results = [];
    let cardData = await getCards();
    if (mode == "matched-search")
    {
        cardData.forEach(card =>
        {
            if (card.name.toLowerCase().includes(input.trim().toLowerCase()))
            {
                results.push(card);
            };
        });
        return results;
    }
    else if (mode == "card-text-search")
    {
        cardData.forEach(card =>
        {
            if (card.desc.toLowerCase().includes(input.trim().toLowerCase()))
            {
                results.push(card);
            };
        });
        return results;
    }
    else if (mode == "filter-search")
    {
        const 
            Type = filterValue.Type,
            Attribute = filterValue.Attribute,
            Spell_Trap_Icon = filterValue["Spell/Trap Icon"],
            Monster_Type = filterValue["Monster Type"],
            Monster_Card_Type = filterValue["Monster Card Type"],
            Monster_Sub_category = filterValue["Monster_Sub_category"],
            Level_Rank = filterValue["Level/Rank"],
            Pendulum_Scale = filterValue["Pendulum Scale"],
            Link_Rating = filterValue["Link-Rating"];

        cardData.forEach(card => 
        {
            if (card.name.toLowerCase().includes(input.trim().toLowerCase()))
            {
                results.push(card);
            }
        });
        return results;
    };
};

module.exports = { search };