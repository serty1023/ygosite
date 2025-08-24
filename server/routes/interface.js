const express = require("express");
const interfaceRouter = express.Router();
const header = require("../data/header.json");
const introduction = require("../data/introduction.json");
const tutorials = require("../data/tutorials.json");
const search_options = require("../data/search_options.json");
const filterbar = require("../data/filterbar.json");
const footer = require("../data/footer.json");
const developerCheck = require("../controller/authorize");

interfaceRouter.get("/interface", developerCheck, (request,response) =>
{
    response.json( {header,introduction,tutorials,search_options,filterbar,footer} );
});

module.exports = interfaceRouter;