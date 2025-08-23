function developerCheck(request,response,next)
{
    if (process.env.developer == "ON")
    {
        return next();
    };
    return response.json( {error:"Unauthorize"} );
};

module.exports = developerCheck;