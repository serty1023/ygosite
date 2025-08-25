fetch("http://localhost:3000/decks")
.then(response => response.json())
.then(data => 
{
    console.log(data["decks"]);
})