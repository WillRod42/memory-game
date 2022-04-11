Describe: Deck()

Test: "It should return an object with an array of card objects of the given size"
Code: new Deck(10);
Expected-output: {"cards": [`<10 cards here>`]}



Describe: Cards()

Test: "It should return an object with a the given value as a property and a position"
Code: new Card("test", [0, 0]);
Expected-output: {"value": "test, pos: {x: 0, y: 0}}