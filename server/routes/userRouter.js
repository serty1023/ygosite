const express = require("express");
const userData = require("../data/user.json");
const developerCheck = require("../controller/authorize.js");

const deckRouter = express.Router();

deckRouter.get("/users", developerCheck, (request,response) =>
{
    response.json(userData);
});

module.exports = deckRouter;