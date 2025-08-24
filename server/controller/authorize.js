function developerCheck(request,response,next)
{
    if (process.env.developer == "ON")
    {
        return next();
    };
    return response.send(
    `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Yu-Gi-Oh!Trading Card Game Website</title>
            </head>
            <body>
                <div style="width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                    <h1 style="font-size: 250%;">
                        NOT AUTHORIZED
                    </h1>
                    <p style="font-size: 150%;">
                        You're not allowed to see this page.
                    </p>
                </div>
            </body>
        </html>
    `
    );
};

module.exports = developerCheck;