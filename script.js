const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word?number=10";
const wordDisplay = document.getElementById('game-display');
const answerInput = document.getElementById('answer-input');
const timeLeftDisplay = document.getElementById('time-left');
const audio_info1 = document.getElementById('audio1');
const audio_info2 = document.getElementById('audio2');
const audio_info3 = document.getElementById('audio3');
const timeScoreDisplay = document.getElementById('score-time'); 
const wordScoreDisplay = document.getElementById('score-words'); 
const easy = document.getElementById('easy');
const hard = document.getElementById('hard');
const master = document.getElementById('master');
const modeDisplay = document.getElementById('mode-display');

// changing global Variables
let timeLeft;
let currentTime = 0;
let score = 0;

//functions
function play1() {
  audio_info1.play();
};

function stop1() {
  audio_info1.pause();
};

function play2() {
  audio_info2.play();
};

function stop2() {
  audio_info2.pause();
};

function play3() {
  audio_info3.play();
};

function stop3() {
  audio_info3.pause();
};

function newGame() {
  window.location.reload();
}


// Total Time Score
function countStart() {
  counter = setInterval(() => {
    timeScoreDisplay.innerHTML = currentTime
    currentTime++;
  }, 1000)
}

// Total Words Score
function scoreIncrease() {
  wordScoreDisplay.innerHTML = score;
  score++;
}

// Modes
function easyMode() {
  modeDisplay.innerText = 'Easy';
  easy.className = 'selected';
  hard.className = '';
  master.className = '';
  timeLeft = 10;
}

function hardMode() {
  modeDisplay.innerText = 'Hard';
  easy.className = '';
  hard.className = 'selected';
  master.className = '';
  timeLeft = 7;
}

function masterMode() {
  modeDisplay.innerText = 'Master';
  easy.className = '';
  hard.className = '';
  master.className = 'selected';
  timeLeft = 5;
}

function playMusic() {
  if (easy.className === 'selected') {
    play1();
  } else if (hard.className === 'selected') {
    play2();
  } else {
    play3();
  }
}

function stopMusic() {
  if (easy.className === 'selected') {
    stop1();
  } else if (hard.className === 'selected') {
    stop2();
  } else {
    stop3();
  }
}

let timer;
function countDown () {

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