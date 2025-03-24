const wordList = [
    'gold', 'charm', 'rainbow', 'pot', 'lucky', 'chest', 'treasure', 'green', 'tradition', 'shenanigans', 'celebration'
]
//setting game variables
let selectedWord = ''
let displayedWord = ''
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6
function startGame(level){
    selectedWord = getRandomWord(level)
    //hide difficulty selection and show game area and difficulty boxes
    updateDifficultyDisplay(level)
//create placeholder for the selected word
displayedWord = '_'.repeat(selectedWord.length)
document.getElementById('wordDisplay').textContext = displayedWord.split('').join(' ')

    // add d-none to difficulty selection and remove d none from difficulty box and game area
    document.getElementById('difficultySelection').classList.add('d-none')
    //add d block to difficulty box and game area
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')
}
function getRandomWord(level){
   let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4
    if (level === 'medium') return word.length >= 5 && word.length <= 7
    if (level === 'hard') return word.length >= 8
   })
   return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}
function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')
//remove any previous difficulty classes
difficultyBox.classList.remove('easy', 'medium', 'hard')
//set text and apply class dynamically using template literals
difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`
difficultyBox.classList.add(level)
}
function guessLetter(){
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()
    //check if input is a valid letter (a-z)
if(!guessedLetter.match(/^[a-z]$/)){
alert('Please enter a valid letter (A-Z)!')
inputField.value = ''
return
}
// check if letter was already guessed
if(guessedLetters.includes(guessedLetter)){
    alert(`You already guessed ' ${guessedLetter} ' . Try a different letter!`)
    inputField.value = ''
    return
} else{
    guessedLetters.push(guessedLetter)}
if(selectedWord.includes(guessedLetter)){
    correctGuess(guessedLetter)
} else {
    wrongGuess(guessedLetter)
}
inputField.value = ''
inputField.focus()
}