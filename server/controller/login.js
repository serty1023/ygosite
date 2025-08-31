const userData = require("../data/user.json");
const argon2 = require("argon2");
const fs = require("fs");
const path = require("path");

async function login(username,password)
{
    const userFound = userData.users.find(user => user.username == username);
    if (!userFound)
    {
        return false;
    };
    const passwordMatched = await argon2.verify(userFound.password,password);
    return passwordMatched;
};

async function register(username,password,confirm_password)
{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const users = userData.users;
    const userFound = users.find(user => user.username == username);
    if (userFound)
    {
        return "userFound";
    };
    if (password != confirm_password)
    {
        return "notMatched";
    };
    if (!passwordRegex.test(password))
    {
        return "regexError";
    };
    password = await argon2.hash(password);
    const highestID = users.length > 0 ? Math.max(...users.map(u => u.id)) : -1;
    const id = highestID + 1;
    const user = 
    {
        id: id,
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