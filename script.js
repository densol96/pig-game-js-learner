'use strict';
let gameOn = true;
// Current Score
let currentScore = 0;
// Active Player
let activePlayer = 0; //Player One starts first
// Total Scores
let totalScores = [0, 0];

// Selecting elements
const diceImage = document.querySelector("img.dice");
const rollDiceButton = document.querySelector(".btn--roll");

const scoreOne = document.querySelector("#score--0");
const scoreTwo = document.querySelector("#score--1");

const currentOne = document.querySelector("#current--0");
const currentTwo = document.querySelector("#current--1");

const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");

const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");


//Starting conditions
diceImage.classList.add("hidden");

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOne.classList.toggle("player--active");
    playerTwo.classList.toggle("player--active");
}

const rollDice = function () {
    if (gameOn) {
        // 1. Generate a random dice roll
        const diceVal = Math.floor(Math.random() * 6) + 1;
        // 2. Display dice
        diceImage.classList.remove("hidden");
        diceImage.src = `dice-${diceVal}.png`
        // 3. Check for rolled 1L if tru, switch to next player
        if (diceVal === 1) {
            // Switch to the next player
            switchPlayer();
        }
        else {
            // Add dice to current score
            currentScore += diceVal;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
    }
}

const hold = function () {
    if (gameOn) {
        totalScores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];
        if (totalScores[activePlayer] >= 20) {
            gameOn = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
            diceImage.classList.add("hidden");
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
        }
        else {
            switchPlayer();
        }
    }
}

const reset = function () {
    gameOn = true;
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");
    activePlayer = 0;
    currentScore = 0;
    totalScores = [0, 0];
}

rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", hold);
newGameButton.addEventListener("click", reset);
