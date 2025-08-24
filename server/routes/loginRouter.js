const express = require("express");
const { login } = require("../controller/login.js")

const loginRouter = express.Router();

loginRouter.post("/", async (request,response) =>
{
    const { username,password } = request.body;
    const results = await login(username,password);
    response.json(results);
});

module.exports = loginRouter;