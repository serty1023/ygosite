const userData = require("../data/user.json");
const fs = require("fs");
const path = require("path");

async function login(username,password)
{
    const userFound = userData.users.find(user => user.username == username && user.password == password);
    if (userFound)
    {
        return true;
    }
    else
    {
        return false;
    };
};

async function register(username,password,confirm_password)
{
    const users = userData.users;
    const userFound = users.find(user => user.username == username);
    if (userFound)
    {
        return "false";
    };
    if (password != confirm_password)
    {
        return false;
    };
    const user = 
    {
        id: userData.users.length,
        username: username,
        password: password
    };
    users.push(user);
    fs.writeFileSync(
        path.join(__dirname,"../data/user.json"),
        JSON.stringify({ users },null,4)
    );
    return true;
};

module.exports = { login,register }