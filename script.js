// Word list categorized by difficulty
const wordList = {
    easy: ['gold', 'luck', 'green', 'coin'],
    medium: ['clover', 'charm', 'lucky', 'magic'],
    hard: ['rainbow', 'fortune', 'leprechaun']
 };
 
 
 // Game Variables
 let selectedWord = '';
 let displayedWord = '';
 let wrongGuesses = 0;
 let guessedLetters = [];
 const maxMistakes = 6;
 let wins = 0;
 let losses = 0;
 let currentDifficulty = '';
 
 
 // Get references to HTML elements
 const wordDisplay = document.getElementById('wordDisplay');
 const wrongLetters = document.getElementById('wrongLetters');
 const shamrockImg = document.getElementById('Shamrock');
 const restartBtn = document.getElementById('restartBtn');
 const letterInput = document.getElementById('letterInput');
 const guessBtn = document.getElementById('guessBtn');
 const winCount = document.getElementById('winCount');
 const lossCount = document.getElementById('lossCount');
 
 
 // Modal elements
 const modalTitle = document.getElementById('modalTitle');
 const modalBody = document.getElementById('modalBody');
 const modal = new bootstrap.Modal(document.getElementById('gameModal'));
 
 
 // Audio elements
 const correctAudio = document.getElementById('correctAudio');
 const wrongAudio = document.getElementById('wrongAudio');
 
 
 // Start Game
 function startGame(level) {
    currentDifficulty = level;
    selectedWord = getRandomWord(level);
    displayedWord = '_'.repeat(selectedWord.length);
    guessedLetters = [];
    wrongGuesses = 0;
 
 
    // Reset UI
    wordDisplay.textContent = displayedWord.split('').join(' ');
    wrongLetters.textContent = 'Wrong Guesses: ';
    shamrockImg.src = 'green.jpg';
    restartBtn.classList.add('d-none');
 
 
    // Enable input and button
    letterInput.disabled = false;
    guessBtn.disabled = false;
 
 
    // Show game area, hide difficulty selection
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
 }
 
 
 // Get a Random Word Based on Difficulty
 function getRandomWord(level) {
    let words = wordList[level];
    return words[Math.floor(Math.random() * words.length)];
 }
 
 
 // Handle Letter Guess
 function guessLetter() {
    let guessedLetter = letterInput.value.toLowerCase();
 
 
    if (!guessedLetter.match(/^[a-z]$/)) {
        showModal('⚠️ Invalid Input', 'Please enter a valid letter (A-Z).');
        letterInput.value = '';
        return;
    }
 
 
    if (guessedLetters.includes(guessedLetter)) {
        showModal('⚠️ Already Guessed', `You already guessed '${guessedLetter}'. Try a different letter!`);
        letterInput.value = '';
        return;
    }
 
 
    guessedLetters.push(guessedLetter);
 
 
    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        wrongGuess(guessedLetter);
    }
 
 
    letterInput.value = '';
    letterInput.focus();
 }
 
 
 // Handle Correct Guess
 function correctGuess(guessedLetter) {
    correctAudio.play();
    let newDisplayedWord = '';
 
 
    for (let i = 0; i < selectedWord.length; i++) {
        newDisplayedWord += selectedWord[i] === guessedLetter ? guessedLetter : displayedWord[i];
    }
 
 
    displayedWord = newDisplayedWord;
    wordDisplay.textContent = displayedWord.split('').join(' ');
 
 
    if (!displayedWord.includes('_')) {
        endGame(true);
    }
 }
 
 
 // Handle Wrong Guess
 function wrongGuess(guessedLetter) {
    wrongAudio.play();
    wrongGuesses++;
    wrongLetters.textContent += `${guessedLetter} `;
    shamrockImg.src = `imgs/Shamrock${wrongGuesses}.png`;
 
 
    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
 }
 
 
 // End Game (Win or Lose)
 function endGame(won) {
    if (won) {
        wins++;
        showModal('🎉 You Won!', 'Great job! You guessed the word correctly. 🍀');
    } else {
        losses++;
        showModal('😞 You Lost', `The correct word was "${selectedWord}". Better luck next time!`);
    }
 
 
    updateWinLossDisplay();
 
 
    // Disable input & button to freeze game
    letterInput.disabled = true;
    guessBtn.disabled = true;
 
 
    // Show restart button
    restartBtn.classList.remove('d-none');
 }
 
 
 // Show Bootstrap Modal for Messages
 function showModal(title, message) {
    modalTitle.textContent = title;
    modalBody.textContent = message;
    modal.show();
 }
 
 
 // Update Win/Loss Display
 function updateWinLossDisplay() {
    winCount.textContent = `Wins: ${wins}`;
    lossCount.textContent = `Losses: ${losses}`;
 }
 
 
 // Restart Game - Returns to Difficulty Selection
 function restartGame() {
    // Hide game area and show difficulty selection
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultySelection').classList.remove('d-none');
 
 
    // Hide restart button
    restartBtn.classList.add('d-none');
 
 
    // Reset input field and enable it
    letterInput.value = '';
    letterInput.disabled = false;
    guessBtn.disabled = false;
 }
 
 
 // Allow user to press Enter to guess a letter
 letterInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        guessLetter();
    }
 });
 