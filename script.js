const wordList = [
    'gold', 'charm', 'rainbow', 'pot', 'lucky', 'chest', 'treasure', 'green', 'tradition', 'shenanigans', 'celebration'
];

// Game Variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;
let wins = 0;
let losses = 0;

// Get references to the audio elements
const correctAudio = document.getElementById('correctAudio');
const wrongAudio = document.getElementById('wrongAudio');

// Start Game
function startGame(level) {
    selectedWord = getRandomWord(level);
    displayedWord = '_'.repeat(selectedWord.length);
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');

    // Show game area and hide difficulty selection
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');

    // Reset win/loss messages and restart button
    document.getElementById('endMessage').classList.add('d-none');
    document.getElementById('restartBtn').classList.add('d-none');
}

// Get Random Word Based on Difficulty
function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4;
        if (level === 'medium') return word.length >= 5 && word.length <= 7;
        if (level === 'hard') return word.length >= 8;
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

// Handle Letter Guess
function guessLetter() {
    let inputField = document.getElementById('letterInput');
    let guessedLetter = inputField.value.toLowerCase();

    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter (A-Z)!');
        inputField.value = '';
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
        inputField.value = '';
        return;
    } else {
        guessedLetters.push(guessedLetter);
    }

    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        wrongGuess(guessedLetter);
    }

    inputField.value = '';
    inputField.focus();
}

// Handle Correct Guess
function correctGuess(guessedLetter) {
    correctAudio.play();
    let newDisplayedWord = '';
    for (let i = 0; i < selectedWord.length; i++) {
        newDisplayedWord += selectedWord[i] === guessedLetter ? guessedLetter : displayedWord[i];
    }

    displayedWord = newDisplayedWord;
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');

    if (!displayedWord.includes('_')) {
        endGame(true);
    }
}

// Handle Wrong Guess
function wrongGuess(guessedLetter) {
    wrongAudio.play();
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += `${guessedLetter} `;
    document.getElementById('Shamrock').src = `imgs/Shamrock${wrongGuesses}.png`;

    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

// End Game (Win or Loss)
function endGame(won) {
    const endMessage = document.getElementById('endMessage');
    const endMessageText = document.getElementById('endMessageText');
    
    if (won) {
        wins++;
        endMessageText.textContent = 'You won 🎉';
    } else {
        losses++;
        endMessageText.textContent = 'You lost 😞';
    }

    updateWinLossDisplay();
    endMessage.classList.remove('d-none');
    
    // Show the restart button by removing the 'd-none' class
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.classList.remove('d-none');  // Ensure this shows the button
}

// Update Win/Loss Display
function updateWinLossDisplay() {
    document.getElementById('winCount').textContent = `Wins: ${wins}`;
    document.getElementById('lossCount').textContent = `Losses: ${losses}`;
}

// Restart Game
function restartGame() {
    // Reset game variables
    wrongGuesses = 0;
    guessedLetters = [];
    
    const difficultyBox = document.getElementById('difficultyBox');
    let level = difficultyBox.classList.contains('easy') ? 'easy' :
                difficultyBox.classList.contains('medium') ? 'medium' : 'hard';
    
    // Start a new game with the same difficulty level
    startGame(level);
    
    // Hide game area, reset everything for a new game
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('restartBtn').classList.add('d-none');
    document.getElementById('letterInput').value = '';
    document.getElementById('Shamrock').src = 'green.jpg'; // Reset Shamrock image
}

// Restart Button Click Event Listener
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Allow user to press Enter when inputting letters
document.getElementById('letterInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        guessLetter();
    } 
});
