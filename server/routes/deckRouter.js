const express = require("express");
const deckData = require("../data/decks.json");
const developerCheck = require("../controller/authorize.js");

const deckRouter = express.Router();

deckRouter.get("/decks", developerCheck, (request,response) =>
{
    response.json(deckData);
});

module.exports = deckRouter;