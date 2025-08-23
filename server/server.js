const express = require("express");
const searchRouter = require("./routes/searchRouter");
const interfaceRouter = require("./routes/interface.js");
const deckRouter = require("./routes/deckRouter.js");
const cors = require("cors");

const application = express();

application.use(cors(
{
    origin: "http://localhost:5173",
    methods: ["GET","POST"]
}));

application.use(express.json());

application.use("/search",searchRouter);
application.use("/",interfaceRouter);

process.env.developer = "ON";

application.listen(3000 , () =>
{
    console.log("Application is running at PORT:3000");
    console.log("Dev Mode: " + process.env.developer)
});