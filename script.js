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
let timeLeft = 10;
let currentTime = 0;
let score = 0;


// Music Play functions
function play1() {
  audio_info1.volume = 0.5;
  audio_info1.play();
};

function stop1() {
  audio_info1.pause();
};

function play2() {
  audio_info2.volume = 0.5;
  audio_info2.play();
};

function stop2() {
  audio_info2.pause();
};

function play3() {
  audio_info3.volume = 0.5;
  audio_info3.play();
};

function stop3() {
  audio_info3.pause();
};

function newGame() {
  window.location.reload();
}

// Timer Bar
let innerDivBar = document.getElementById('timebar-left');
let divTimerBar = document.getElementById('timer-bar');
// Different lengths for difficulty settings

let startTimer;  
let amountTime = 22; //bug here with the first input defaulting to this (works fine after finishing one word) FIXED
function startBarCount() {
  // fixed first input timebar bug
  if (master.className === 'selected') {
    amountTime = 12;
  } else if (hard.className === 'selected') {
    amountTime = 16;
  } else {
    amountTime = 22;
  }

  if (startTimer) {
    if (master.className === 'selected') {
      amountTime = 12;
    } else if (hard.className === 'selected') {
      amountTime = 16;
    } else {
      amountTime = 22;
    }
    innerDivBar.style.width = 0
    clearInterval(startTimer)
  }
  startTimer = setInterval(barCount, amountTime);
  function barCount() {
    if (innerDivBar.clientWidth < divTimerBar.clientWidth) {
      innerDivBar.style.width = innerDivBar.clientWidth + 1 + "px"
    } else {
      innerDivBar.style.width = divTimerBar.clientWidth + "px"
      clearInterval(startTimer)
      innerDivBar.style.width = 0
    }
  }
};

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
  if (master.className === 'selected') {
    play3();
  } else if (hard.className === 'selected') {
    play2();
  } else {
    play1();
  }
}

function stopMusic() {
  if (master.className === 'selected') {
    stop3();
  } else if (hard.className === 'selected') {
    stop2();
  } else {
    stop1();
  }
}

let timer;
function countDown () {
  // this will take away any previous existing timers (resetting)
  if (timer) {
    if (master.className === "selected") {
      timeLeft = 5
    } else if (hard.className === "selected") {
      timeLeft = 7
    } else {
      timeLeft = 10
    }
    clearInterval(timer)
  };

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      stopMusic();
      alert(`Try again to finish and get your score!`)
      clearInterval(timer)
      currentTime = 0
      score = 0
      newGame();
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
let win;
function youWin(){
  win = setInterval(() => {
    stopMusic();
    alert(`You made it! Score: ${score}.`);
    newGame();
  }, 100000);
}

// Input match checker
answerInput.addEventListener('input', () => {
  const arrWord = wordDisplay.querySelectorAll('span');
  const arrValue = answerInput.value.split('');

  // starts music
  if (firstInput) {
    firstInput = false;
    countDown();
    startBarCount();
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
    countDown()
    scoreIncrease()
    startBarCount()
    playMusic()
    renderNextWord()
  }
})

let bufferWord;
// RandomWord API Getter
const getRandomWord = () => {
  return fetch(RANDOM_WORD_API_URL)
    .then(response => response.json())
    .then(data => data[1])
};

async function renderNextWord() {
  // bufferWord used to fix lag time
  const word = bufferWord || await getRandomWord();
  wordDisplay.innerHTML = '';
  word.split('').forEach(element => {
    const character = document.createElement('span');
    character.innerText = element;
    wordDisplay.appendChild(character);
  });
  answerInput.value = null;
  // this is here to preload next word ahead of time
  bufferWord = await getRandomWord();
};

// Here to make sure that an initial word renders on reload
renderNextWord();