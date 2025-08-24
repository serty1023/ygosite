const express = require("express");
const userData = require("../data/user.json");
const developerCheck = require("../controller/authorize.js");
const fs = require("fs");
const path = require("path");

const userRouter = express.Router();

userRouter.get("/users", developerCheck, (request,response) =>
{
    response.json(userData.users);
});

module.exports = userRouter;