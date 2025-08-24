const axios = require("axios");

let userData = null;

async function getUserData()
{
    if (!userData)
    {
        userData = (await axios.get("http://localhost:3000/users")).data.users;
    };
    return userData;
};

async function login(username,password)
{
    userData = await getUserData();
    userData.forEach(user =>
    {
        if (user.username == username && user.password == password)
        {
            return {message:"LOGIN SUCCESSFULLY"};
        }
        else
        {
            return {message:"LOGIN FAILED"};
        };
    })
};

module.exports = { login }