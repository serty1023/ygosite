function parseYDK(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

    const deck = {
        name: "",
        avatar: "",
        author: "serty1023",
        description: "",
        main: [],
        extra: [],
        side: []
    };

    let section = null;

    for (const line of lines) {
        if (line.startsWith("#main")) {
            section = "main";
        } else if (line.startsWith("#extra")) {
            section = "extra";
        } else if (line.startsWith("!side")) {
            section = "side";
        } else if (!line.startsWith("#") && !line.startsWith("!")) {
            if (section) {
                deck[section].push(line);
            }
        }
    }

    return deck;
}

// Example usage:
const ydkText = 
`
#main 
97268402
97268402
14558127
14558127
14558127
23434538
23434538
23434538
59438930
91800273
42141493
42141493
42141493
84192580
84192580
84192580
11590299
11590299
23657016
23657016
39931513
39931513
39931513
91810826
65326118
65326118
33854624
30336082
18144507
14532163
12580477
24299458
24299458
66730191
66730191
66730191
23002292
10045474
10045474
10045474
#extra 
18969888
39402797
82570174
82570174
73580471
80696379
87837090
40509732
24361622
2857636
48815792
29301450
2772337
57134592
45112597
!side 

`;

console.log(JSON.stringify(parseYDK(ydkText), null, 2));