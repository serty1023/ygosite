const express = require("express");
const { register } = require("../controller/login.js")

const registerRouter = express.Router();

registerRouter.post("/", async (request,response) =>
{
    const { username,password,confirm_password } = request.body;
    const results = await register(username,password,confirm_password);
    response.json(results);
});

module.exports = registerRouter;