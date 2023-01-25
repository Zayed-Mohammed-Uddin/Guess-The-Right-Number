"use strict";
const min = 1;
const max = 20;
let randomNumber = Math.trunc(Math.random() * max) + 1;

const checkButton = document.querySelector("#checkBtn");
const getValue = document.querySelector("#inputText");
const changeTitle = document.querySelector("#sub_section_title");
const displayNumber = document.querySelector("#displayRandomNumber");
const resetButton = document.querySelector("#againBtn");
const resetForm = document.querySelector("#gameForm");
const gameChance = document.getElementById("gameLife");
const winCount = document.getElementById("winStreak");
let g1 = parseInt(gameChance.textContent);
let w1 = parseInt(winCount.textContent);

let bodyColorChange = false;

function colorReset() {
	if (bodyColorChange) {
		document.body.style.backgroundColor = "#202124";
	}
}
function resetGame() {
	randomNumber = Math.trunc(Math.random() * max) + 1;
	displayNumber.textContent = "?";
	resetForm.reset();
	g1 = 20;
	gameChance.textContent = g1;
	colorReset();
	if (w1 == 5) {
		changeTitle.textContent = "🏆 You won the game!";
		w1 = 0;
		winCount.textContent = w1;
		seTimeout(resetGame, 2000);
	} else {
		changeTitle.textContent = "💭 Start Guessing...!";
	}
}

resetButton.addEventListener("click", function () {
	const confirmationValue = window.confirm("Are you sure you want to reset the game data?");
	if(confirmationValue){
		w1 = 0;
		winCount.textContent = w1;
		setTimeout(resetGame, 1500);
	}
});
checkButton.addEventListener("click", function () {
	if (!getValue.value) {
		changeTitle.textContent = "⚠️ Enter a correct number!";
		document.body.style.backgroundColor = "red";
		bodyColorChange = true;
	} else if (Number(getValue.value) === randomNumber) {
		changeTitle.textContent = "✨ Correct number!";
		document.body.style.backgroundColor = "green";
		displayNumber.textContent = randomNumber;
		bodyColorChange = true;
		w1++;
		winCount.textContent = w1;
		setTimeout(resetGame, 2000);
	} else if (Number(getValue.value) < 1 || Number(getValue.value) > 20) {
		changeTitle.textContent = "❓ Out of bound!";
		document.body.style.backgroundColor = "red";
		bodyColorChange = true;
		if (g1 == 0) {
			changeTitle.textContent = "❌ You lost the game!";
			setTimeout(resetGame, 2000);
		} else {
			g1--;
			gameChance.textContent = g1;
		}
	} else {
		if (Number(getValue.value) < randomNumber) {
			changeTitle.textContent = "📉 Too low!";
			document.body.style.backgroundColor = "red";
			bodyColorChange = true;
			if (g1 == 0) {
				changeTitle.textContent = "❌ You lost the game!";
				setTimeout(resetGame, 2000);
			} else {
				g1--;
				gameChance.textContent = g1;
			}
		} else {
			changeTitle.textContent = "📈 Too high!";
			document.body.style.backgroundColor = "red";
			bodyColorChange = true;
			if (g1 == 0) {
				changeTitle.textContent = "❌ You lost the game!";
				setTimeout(resetGame, 2000);
			} else {
				g1--;
				gameChance.textContent = g1;
			}
		}
	}
});