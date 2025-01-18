// Variables to store game state
let gameState = {
    currentZone: 'Valley of Emotions', // The first zone
    attemptsLeft: 10,
    numberToGuess: 50,  // For the 'guess the number' challenge
    zonesCompleted: 0,
    mindGems: 0,
    isGameOver: false,
};

// Set up canvas for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up UI elements
const startBtn = document.getElementById('startBtn');
const zoneDescription = document.getElementById('zoneDescription');
const gameProgression = document.getElementById('gameProgression');
const inputBox = document.createElement('input');
const submitButton = document.createElement('button');

// Initialize game
startBtn.addEventListener('click', startGame);

// Start the game and load the first zone
function startGame() {
    gameState.attemptsLeft = 10;
    gameState.numberToGuess = Math.floor(Math.random() * 100) + 1;
    gameState.isGameOver = false;
    gameState.zonesCompleted = 0;
    gameState.mindGems = 0;

    // Display initial instructions
    zoneDescription.innerHTML = "Guess the number between 1 and 100!";
    gameProgression.innerHTML = "Attempts Left: " + gameState.attemptsLeft;

    // Create input elements
    inputBox.value = "";
    submitButton.innerText = 'Submit Guess';
    document.getElementById('controls').appendChild(inputBox);
    document.getElementById('controls').appendChild(submitButton);

    submitButton.addEventListener('click', function () {
        const guess = parseInt(inputBox.value);
        handleGuess(guess);
    });

    updateGame();
}

// Handle player's guess
function handleGuess(guess) {
    if (gameState.attemptsLeft > 0) {
        if (guess === gameState.numberToGuess) {
            alert("Correct guess! You've completed the challenge.");
            gameState.mindGems++;
            moveToNextZone();
        } else {
            alert("Incorrect. Try again.");
            gameState.attemptsLeft--;
            gameProgression.innerHTML = "Attempts Left: " + gameState.attemptsLeft;
        }
    } else {
        alert("Game Over! You've run out of attempts.");
        gameState.isGameOver = true;
        endGame();
    }
}

// Move to the next zone
function moveToNextZone() {
    if (gameState.zonesCompleted === 0) {
        gameState.currentZone = "Maze of Overthinking";
        zoneDescription.innerHTML = "Welcome to the Maze of Overthinking!";
    } else if (gameState.zonesCompleted === 1) {
        gameState.currentZone = "Resilience Forest";
        zoneDescription.innerHTML = "Welcome to the Resilience Forest!";
    } else {
        gameState.currentZone = "Final Zone";
        zoneDescription.innerHTML = "You've reached the final zone!";
        endGame();
    }
    gameState.zonesCompleted++;
    updateGame();
}

// Update the game UI
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    ctx.fillText(`Attempts Left: ${gameState.attemptsLeft}`, 10, 30);
    ctx.fillText(`Mind Gems: ${gameState.mindGems}`, 10, 60);
    ctx.fillText(`Current Zone: ${gameState.currentZone}`, 10, 90);
}

// End the game
function endGame() {
    if (gameState.mindGems === 3) {
        alert("Congratulations! You've completed the Mindscape journey.");
    } else {
        alert("Better luck next time! You didn't complete all the zones.");
    }
}
