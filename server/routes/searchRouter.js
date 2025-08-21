const express = require("express");
const { search } = require("../controller/search");

const searchRouter = express.Router();

searchRouter.post("/", async (request,response) => 
{
    const { input,filterValue,mode } = request.body;
    const results = await search(input,filterValue,mode);
    response.json(results);
});

module.exports = searchRouter;