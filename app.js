"use strict";

const resetBtn = document.getElementById("resetBtn");
const inputNumber = document.getElementById("numberBox");
const checkBtn = document.getElementById("checkBtn");
const gameLife = document.getElementById("gameLife");
const winStreak = document.getElementById("winStreak");
const measureNumber = document.getElementById("numberMeasurement");
const displayScore = document.getElementById("displayNumberBox");
const bodyColor = document.getElementById("bodyColor");
const gameForm = document.getElementById("gameForm");
const min = 1;
const max = 20;
let randomNumber = Math.trunc(Math.random() * max) + min;
let gameChance = parseInt(gameLife.textContent);
let winCount = parseInt(winStreak.textContent);

const resetColor = () => {
	bodyColor.style.backgroundColor = "var(--primaryBackgroundColor)";
};
// modal pop-up
$("#closebutton").click(function () {
	$(".modal-backdrop").remove();
});

document.querySelector("#closebutton").addEventListener("click", function () {
	resetGameData();
	document.querySelector(".modal").hide();
});

document.querySelector("#closeBtn").addEventListener("click", function () {
	resetGameData();
	document.querySelector(".modal").hide();
});
const resetGameData = function () {
	// go back to the initial state
	measureNumber.textContent = "💭 Start Guessing...";
	gameLife.textContent = `20`;
	winStreak.textContent = `0`;
	displayScore.textContent = "?";
	gameChance = 20;
	winCount = 0;
	randomNumber = Math.trunc(Math.random() * max) + min;
	gameForm.reset();
	resetColor();
};
const decreaseGameChance = function () {
	gameChance--;
	gameLife.textContent = gameChance;
	if (gameChance == 0) {
		measureNumber.textContent = `❌ You lost the game!`;
		bodyColor.style.backgroundColor = "#ff0000";
		$(document).ready(function () {
			setTimeout(function () {
				$("#myModal").modal("show");
			}, 100);
		});
	}
};
const resetInfo = () => {
	displayScore.textContent = "?";
	measureNumber.textContent = "💭 Start Guessing...";
	bodyColor.style.backgroundColor = "#222";
	randomNumber = Math.trunc(Math.random() * max) + min;
	gameForm.reset();
};
function startGame() {
	checkBtn.addEventListener("click", function () {
		if (inputNumber.value == "") {
			measureNumber.textContent = `⚠️ Enter a correct number!`;
			bodyColor.style.backgroundColor = "#ff0000";
		} else if (inputNumber.value < 1 || inputNumber.value > 20) {
			measureNumber.innerHTML = `<h5>⛔ Out of Range!</h5>`;
			decreaseGameChance();
		} else {
			if (inputNumber.value == randomNumber) {
				bodyColor.style.backgroundColor = "#60b347";
				displayScore.textContent = randomNumber;
				measureNumber.textContent = "✨ Correct number!";
				winCount++;
				winStreak.textContent = winCount;
				if (winCount == 5) {
					// display modal to show that you are the winner here bs-modal
					measureNumber.textContent = "🏆 You won the game!";
					$(document).ready(function () {
						setTimeout(function () {
							$("#myModalTwo").modal("show");
						}, 100);
					});
				} else {
					setTimeout(resetInfo, 1700);
				}
			} else if (inputNumber.value > randomNumber) {
				measureNumber.textContent = "📈 Too high!";
				decreaseGameChance();
			} else {
				measureNumber.textContent = "📉 Too low!";
				decreaseGameChance();
			}
		}
	});
}

// reset the game data
resetBtn.addEventListener("click", function () {
	const removeGameData = window.confirm(
		"Are you sure you want to reset the game data?"
	);
	if (removeGameData) {
		resetGameData();
	} else {
		startGame();
	}
});
