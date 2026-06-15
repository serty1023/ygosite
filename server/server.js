const express = require("express");

const searchRouter = require("./routes/searchRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const registerRouter = require("./routes/registerRouter.js");
const interfaceRouter = require("./routes/interface.js");
const userRouter = require("./routes/userRouter.js");

const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");

const application = express();

application.use(cors(
{
    origin: "http://localhost:5173",
    methods: ["GET","POST"]
}));

application.use(express.json());
application.use(favicon(path.join(__dirname,"icon.png")))

application.use("/search",searchRouter);
application.use("/login",loginRouter);
application.use("/register",registerRouter);
application.use("/",interfaceRouter);
application.use("/",userRouter);

application.listen(3000 , () =>
{
    console.log("Application is running at PORT:5173");
    console.log("Server is running at http://localhost:3000/")
    console.log("Dev Mode: " + process.env.developer);
});