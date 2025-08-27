const express = require("express");
const deckData = require("../data/decks.json");
const developerCheck = require("../controller/authorize.js");

const deckRouter = express.Router();

deckRouter.get("/decks", developerCheck, (request,response) =>
{
    response.json(deckData.decks);
});

deckRouter.get("/decks/:id", developerCheck, (request,response) =>
{
    const id = parseInt(request.params.id,10);
    const deck = deckData.decks.find(d => d.id == id);

    if (deck)
    {
        response.json(deck);
    }
    else
    {
        response.json({error:"Not Found"});
    };
});

module.exports = deckRouter;