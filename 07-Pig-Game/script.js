'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting conditions
score0El.textContent = 0; //here we are assigning the number not string but J.S will automatically convert it into string
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0; //considering initially that active player is 0
let score0 = 0;
let score1 = 0;
let playing = true;

function switchToPlayer1() {
  player0El.classList.remove('player--active'); //changing the UI by removing and adding the class
  player1El.classList.add('player--active');
  activePlayer = 1; //switching active player
  currentScore = 0; //resetting the current score
  current0El.textContent = 0;
}

function switchToPlayer0() {
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  activePlayer = 0;
  currentScore = 0; //resetting the current score
  current1El.textContent = 0;
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random Dice Roll
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    // 3.check for rolled == 1 ? if true ,switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      //updating the currentScore of the active player
      if (activePlayer === 0) current0El.textContent = currentScore;
      else if (activePlayer === 1) current1El.textContent = currentScore;
    } else {
      // switch to next player
      if (player0El.classList.contains('player--active')) {
        switchToPlayer1();
      } else if (player1El.classList.contains('player--active')) {
        switchToPlayer0();
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    if (player0El.classList.contains('player--active')) {
      //Add current score to total score
      score0 += currentScore;
      score0El.textContent = score0;
      currentScore = 0;

      //  checking if the score of current player is greater than 100 ?
      if (score0 >= 100) {
        player0El.classList.add('player--winner');
        playing = false;
      } else {
        switchToPlayer1();
      }
    } else if (player1El.classList.contains('player--active')) {
      //Add current score to total score
      score1 += currentScore;
      score1El.textContent = score1;
      currentScore = 0;

      //  checking if the score of current player is greater than 100 ?
      if (score1 >= 100) {
        player1El.classList.add('player--winner');
        playing = false;
      } else {
        switchToPlayer0();
      }
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0; //here we are assigning the number not string but J.S will automatically convert it into string
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0; //considering initially that active player is 0
  score0 = 0;
  score1 = 0;
  playing = true;

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;

  if (player0El.classList.contains('player--winner')) player0El.classList.remove('player--winner');
  else player1El.classList.remove('player--winner');

});