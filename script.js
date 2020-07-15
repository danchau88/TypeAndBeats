const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word?number=10";
const wordDisplay = document.getElementById('game-display');
const answerInput = document.getElementById('answer-input');
const timeLeftDisplay = document.getElementById('time-left');
const audio_info = document.getElementById('audio1');
const timeScoreDisplay = document.getElementById('score-time'); 
const wordScoreDisplay = document.getElementById('score-words'); 

function playMusic() {
  audio_info.play();
};

function stopMusic() {
  audio_info.pause();
}

let currentTime = 0;
// Total Time Score
function countStart() {
  counter = setInterval(() => {
    timeScoreDisplay.innerHTML = currentTime
    currentTime++;
  }, 1000)
}

let score = 0;
// Total Words Score
function scoreIncrease() {
  wordScoreDisplay.innerHTML = score;
  score++;
}

let timer;
function countDown () {
  let timeLeft = 8;

  // this will take away any previous existing timers (resetting)
  if (timer) {clearInterval(timer)};

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      stopMusic();
      alert(`Try again to finish and get your score!`)
      clearInterval(timer)
      currentTime = 0
      score = 0
    } 
    timeLeftDisplay.innerHTML = timeLeft
    timeLeft -= 1
  }, 1000)
}

// for the first input to start timer --> for first input after everyword
let firstInput = true; 
// this is for after every word
let firstWord = true;

//You Win Message
function youWin(){
  win = setInterval(() => {
    alert(`You made it! Score: ${score}.`)
  }, 100000);
  stopMusic();
}

// Input match checker
answerInput.addEventListener('input', () => {
  const arrWord = wordDisplay.querySelectorAll('span');
  const arrValue = answerInput.value.split('');

  // starts music
  if (firstInput) {
    firstInput = false;
    playMusic();
    youWin();
  }

  //starts countDown
  if (firstWord) {
    firstWord = false;
    countStart();
    countDown();
  }

  let correct = true;
  arrWord.forEach((charSpan, index) => {
    const char = arrValue[index];
    if (char === charSpan.innerText) {
      charSpan.classList.add('correct')
      charSpan.classList.remove('wrong')
    }
    else if  (char !== charSpan.innerText) {
      charSpan.classList.remove('correct')
      charSpan.classList.add('wrong')
      correct = false
    }
    else {
      charSpan.classList.remove('correct')
      charSpan.classList.remove('wrong')
      correct = false
    }
  })

  if (correct) {
    // resets countdown
    playMusic()
    countDown()
    scoreIncrease()
    renderNextWord()
  }
})

// RandomWord API Getter
const getRandomWord = () => {
  return fetch(RANDOM_WORD_API_URL)
    .then(response => response.json())
    .then(data => data[1])
};

async function renderNextWord() {
  const word = await getRandomWord();
  wordDisplay.innerHTML = '';
  word.split('').forEach(element => {
    const character = document.createElement('span');
    character.innerText = element;
    wordDisplay.appendChild(character);
  });
  answerInput.value = null;
};

// Here to make sure that an initial word renders on reload
renderNextWord();