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