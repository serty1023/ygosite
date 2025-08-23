const express = require("express");
const deckData = require("../data/decks.json");
const developerCheck = require("../controller/authorize.js");

const deckRouter = express.Router();

deckRouter.get("/", (request,response) =>
{
    if (developerCheck())
    {
        response.json(deckData);
    }
    else
    {
        response.json( {error:"Unauthorized"} );
    };
});

module.exports = deckRouter;