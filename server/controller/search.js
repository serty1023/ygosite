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

let cardData = null;

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
    }
    else if (mode == "advanced-search")
    {
        if (input.length != 0)
        {
            const inputWords = input.toLowerCase().trim().replace(/"/g,"").split(/[\s-]+/);
            cardData.forEach(card => 
            {
                const cardWords = card.name.toLowerCase().trim().replace(/"/g,"").split(/[\s-]+/);
                let archetypeWords = []
                if (card.archetype)
                {
                    archetypeWords = card.archetype.toLowerCase().trim().replace(/"/g,"").split(/[\s-]+/);
                };
                const matched = inputWords.every(inputWord => 
                    cardWords.some(cardWord => levenshteinDistance(inputWord,cardWord) <= cardWord.length/2.5) ||
                    archetypeWords.some(archetypeWord => levenshteinDistance(inputWord,archetypeWord) <= archetypeWord.length/2.5)
                );
                
                if (matched)
                {
                    results.push(card);
                };
            });
        };
    }
    else if (mode == "filter-search")
    {
        const 
            Type = filterValue.Type,
            Attribute = filterValue.Attribute,
            Spell_Trap_Icon = filterValue["Spell/Trap Icon"],
            Monster_Type = filterValue["Monster Type"],
            Monster_Card_Type = filterValue["Monster Card Type"],
            Monster_Sub_category = filterValue["Monster Sub-category"],
            Level_Rank = filterValue["Level/Rank"],
            Pendulum_Scale = filterValue["Pendulum Scale"],
            Link_Rating = filterValue["Link-Rating"];

        if (Attribute || Monster_Type || Monster_Card_Type || Monster_Sub_category || Level_Rank || Pendulum_Scale || Link_Rating)
        {
            if (Type && (Type.includes("Spell") || Type.includes("Trap")))
            {
                cardData = [];
            };
            if (Attribute)
            {
                cardData = cardData.filter(card => Attribute.includes(card.attribute));
            };
            if (Monster_Type)
            {
                cardData = cardData.filter(card => Monster_Type.includes(card.race));
            };
            if (Monster_Card_Type)
            {
                cardData = cardData.filter(card => Monster_Card_Type.every(type => card.humanReadableCardType.includes(type)));
            };
            if (Monster_Sub_category)
            {
                cardData = cardData.filter(card => Monster_Sub_category.every(category => card.humanReadableCardType.includes(category)));
            };
            if (!Link_Rating)
            {
                if (Level_Rank)
                {
                    Level_Rank = cardData = cardData.filter(card => Level_Rank.includes(card.level));
                };
                if (Pendulum_Scale)
                {
                    cardData = cardData.filter(card => Pendulum_Scale.includes(card.scale));
                };
            }
            else
            {
                if (Level_Rank || Pendulum_Scale)
                {
                    cardData = [];
                }
                else
                {
                    cardData = cardData.filter(card => Link_Rating.includes(card.linkval));
                };
            };
        }
        else
        {
            if (Type && Type.includes("Monster"))
            {
                cardData = [];
            };
            cardData = cardData.filter(card => Spell_Trap_Icon.every(icon => card.race.includes(icon)));
        };

        cardData.forEach(card => 
        {
            if (card.name.toLowerCase().includes(input.trim().toLowerCase()))
            {
                results.push(card);
            }
        });
    };
    return results;
};

module.exports = { search };