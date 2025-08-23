function developerCheck()
{
    if (process.env.developer == "ON")
    {
        return true;
    };
    return false;
};

module.exports = developerCheck;