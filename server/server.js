const express = require("express");
const searchRouter = require("./routes/searchRouter");
const interfaceRouter = require("./routes/interface.js")
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

application.listen(3000 , () =>
{
    console.log("Application is running at PORT:3000");
});