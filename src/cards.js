export default function Deck(size, numRows) {
  this.cards = [];
  this.numRows = numRows;
  this.size = size;

  let count = -1;
  let flag = true;
  for (let i = 0; i < numRows; i++) {
    this.cards.push([]);
    for (let j = 0; j < (size / numRows); j++) {
      if (flag) {
        count++;
      } 

      this.cards[i].push(new Card(count));
      flag = !flag;
    }
  }
}

Deck.prototype.shuffle = function() {
  let cards = [];
  for (let i = 0; i < this.numRows; i++) {
    for (let j = 0; j < (this.size / this.numRows); j++) {
      cards.push(this.cards[i][j]);
    }
  }

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  let index = 0;
  for (let i = 0; i < this.numRows; i++) {
    for (let j = 0; j < (this.size / this.numRows); j++) {
      this.cards[i][j] = cards[index];
      index++;
    }
  }
};

Deck.prototype.indexOf = function(card) {
  for (let i = 0; i < this.cards.length; i++) {
    let index = this.cards[i].indexOf(card);
    if (index !== -1) {
      return [i, index];
    }
  }

  return -1;
};

Deck.prototype.findCard = function(coors) {
  return this.cards[coors.x][coors.y];
}

function Card(value) {
  this.value = value;
}

Card.prototype.matches = function(otherCard) {
  return this.value === otherCard.value;
};