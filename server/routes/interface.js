const express = require("express");
const interfaceRouter = express.Router();
const header = require("../data/header.json");
const introduction = require("../data/introduction.json");
const tutorials = require("../data/tutorials.json");
const search_options = require("../data/search_options.json");
const filterbar = require("../data/filterbar.json");
const card_layout = require("../data/card_layout.json");
const footer = require("../data/footer.json");
const developerCheck = require("../controller/authorize");

interfaceRouter.get("/interface", developerCheck, (request,response) =>
{
    response.json( {header,introduction,tutorials,search_options,filterbar,card_layout,footer} );
});

interfaceRouter.get("/interface/:name", developerCheck, (request,response) =>
{
    const { name } = request.params;
    const data = {header,introduction,tutorials,search_options,filterbar,card_layout,footer};
    if (data[name])
    {
        response.json( data[name][name] );
    }
    else
    {
        response.json({error:"Not Found"});
    };
});

module.exports = interfaceRouter;