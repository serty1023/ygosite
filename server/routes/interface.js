const express = require("express");
const interfaceRouter = express.Router();
const header = require("../data/header.json");
const home = require("../data/home.json");
const card_search_options = require("../data/card_search_options.json");
const filterbar = require("../data/filterbar.json");
const card_layout = require("../data/card_layout.json");
const developerCheck = require("../controller/authorize");

interfaceRouter.get("/interface", developerCheck, (request,response) =>
{
    response.json( {header,home,card_search_options,filterbar,card_layout} );
});

interfaceRouter.get("/interface/:name", developerCheck, (request,response) =>
{
    const { name } = request.params;
    const data = {header,home,card_search_options,filterbar,card_layout};
    if (data[name])
    {
        response.json( data[name][name] );
    }
    else
    {
        response.json({error:"Not Found"});
    };
});

interfaceRouter.get("/interface/tutorials/:lang", developerCheck, (request,response) =>
{
    const { lang } = request.params;

    try
    {
        const tutorials = require(`../data/tutorials/${lang}.json`);
        response.json(tutorials);
    }
    catch
    {
        response.json({error:"Not Found"});
    };
})

module.exports = interfaceRouter;