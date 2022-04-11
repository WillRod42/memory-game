import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Deck from './cards.js';

function createCardGrid(deck) {
  let gridHTML = "";
  let cardsPerRow = (deck.size / deck.numRows);
  let spacingColumns = ((document.body.clientWidth - (cardsPerRow * 100)) / 2) + "px";

  for (let i = 0; i < deck.numRows; i++) {
    gridHTML += "<div class='row'>";
    gridHTML += "<div style='width: " + spacingColumns + "'></div>";
    for (let j = 0; j < cardsPerRow; j++) {
      gridHTML += "<div id='" + i + "-" + j + "' class='card text-center'>" + "</div>";
    }
    gridHTML += "</div></div>";
  }
  return gridHTML;
}

function showCard(cardHTML, selectedCardHTML, card, selectedCard) {
  cardHTML.html("<p>" + card.value + "</p>");
  if (!card.matches(selectedCard)) {
    cardHTML.addClass("not-matched");
    selectedCardHTML.addClass("not-matched");
    setTimeout(function() {
      cardHTML.html("<p></p>");
      selectedCardHTML.html("<p></p>");
      cardHTML.removeClass("not-matched");
      selectedCardHTML.removeClass("not-matched");
    }, 1000);
  } else {
    cardHTML.addClass("matched");
    selectedCardHTML.addClass("matched");

    cardHTML.unbind("click");
    selectedCardHTML.unbind("click");
  }
}

$(function() {
  let deck = new Deck(12, 4);
  let selectedCard = null;
  let turns = $("#turns");
  let numTurns = 0;
  $("#start").on("click", function() {
    deck.shuffle();
    numTurns = 0;
    turns.text(numTurns);
    $("#game").html(createCardGrid(deck));
    $(".card").on("click", function() {
      let coors = $(this).attr("id").split("-");
      coors[0] = parseInt(coors[0]);
      coors[1] = parseInt(coors[1]);

      let card = deck.cards[coors[0]][coors[1]];
      if (selectedCard === card) {
        selectedCard = null;
        $(this).html("<p></p>");
      } else {
        if (!selectedCard) {
          $(this).html("<p>" + card.value + "</p>");
          selectedCard = card;
        } else {
          let index = deck.indexOf(selectedCard);
          if (card.matches(selectedCard)) {
            showCard($(this), $("#" + index[0] + "-" + index[1]), card, selectedCard);
          } else {
            showCard($(this), $("#" + index[0] + "-" + index[1]), card, selectedCard);
          }
          selectedCard = null;
          numTurns++;
          turns.text(numTurns);
        }
      }
    });
  });
});