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
const minute = document.getElementById('minute');
const regular = document.getElementById('regular');
const modeDisplay = document.getElementById('mode-display');
const muteButton = document.getElementById('sound-icon');

// changing global Variables
let timeLeft = 10;
let totalTimeLeft = 100;
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

// Mute Button
let muted = true;
function muteAll() {
  if (muted === false) {
    audio_info1.volume = 0.5;
    audio_info2.volume = 0.5;
    audio_info3.volume = 0.5;
    muteButton.className = "fas fa-volume-up";
  } else {
    audio_info1.volume = 0.0;
    audio_info2.volume = 0.0;
    audio_info3.volume = 0.0;
    muteButton.className = "fas fa-volume-mute";
  }
  muted = !muted; 
}

// Reset Game 
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
let counter;
function countStart() {
  counter = setInterval(() => {
    totalTimeLeft--;
    timeScoreDisplay.innerHTML = totalTimeLeft
    if (totalTimeLeft < 0) {
      clearInterval(counter);
      youWin();
    };
  }, 1000)
}

//You Win Function
function youWin() {
  stopMusic();
  alert(`You made it! Score: ${score}.`);
  newGame();
}

// Total Words Score
function scoreIncrease() {
  score++;
  wordScoreDisplay.innerHTML = score;
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

function minuteMode() {
  minute.className = 'selected';
  regular.className = '';
  totalTimeLeft = 60;
  timeScoreDisplay.innerHTML = totalTimeLeft;
}

function regularMode() {
  minute.className = '';
  regular.className = 'selected';
  totalTimeLeft = 100;
  timeScoreDisplay.innerHTML = totalTimeLeft;
}

// Filter Songs Played
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
      minute.className === 'selected' ? totalTimeLeft = 60 : totalTimeLeft = 100
      score = 0
      newGame();
    } 
    timeLeftDisplay.innerHTML = timeLeft
    timeLeft -= 1
  }, 1000)
}

// for the first input to start timer --> for first input after everyword
let firstInput = true; 
// this is for after every word (not needed)
// let firstWord = true;

// Input match checker
answerInput.addEventListener('input', () => {
  const arrWord = wordDisplay.querySelectorAll('span');
  const arrValue = answerInput.value.split('');

  // starts music
  if (firstInput) {
    firstInput = false;
    countDown();
    startBarCount();
    countStart();
    playMusic();
  }

  //starts countDown
  // if (firstWord) {
  //   firstWord = false;
  //   countStart();
  //   countDown();
  // }

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

let word;
async function renderNextWord() {
  // bufferWord used to fix lag time
  if (word === bufferWord) {
    word = await getRandomWord(); 
  } else {
    word = bufferWord;
  }
  wordDisplay.innerHTML = '';
  word.split('').forEach(element => {
    const character = document.createElement('span');
    character.innerText = element;
    wordDisplay.appendChild(character);
  });
  answerInput.value = null;
  // this is here to preload next word ahead of time
  bufferWord = await getRandomWord();
  //double checks for duplicates --> still working on this bug
  // while (bufferWord === word) {
  //   bufferWord = await getRandomWord() 
  // };
};

// Here to make sure that an initial word renders on reload
renderNextWord();