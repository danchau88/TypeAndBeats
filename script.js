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
// const canvas = document.getElementById('visualizer');

// changing global Variables
let timeLeft;
let currentTime = 0;
let score = 0;

//Visualizer Functions
// function seeBeats() {
//   let context = canvas.getContext("2d");
//   let centerX = canvas.width/2;
//   let centerY = canvas.height/2;
//   let radius = 60;

//   let audioContext = new AudioContext();
//   let analyzer = audioContext.createAnalyser();
//   let bufferLength = analyzer.frequencyBinCount;
//   let frequencyArr = new Uint8Array(bufferLength);
//   // let source = audioContext.createMediaElementSource(audio_info1);
//   analyzer.getByteFrequencyData(frequencyArr)
//   // source.connect(analyzer);
//   analyzer.connect(audioContext.destination);

//   for(let i = 0; i < bufferLength; i++) {
//     let x1 = centerX + Math.cos(i) * radius;
//     let y1 = centerY + Math.sin(i) * radius;
//     let x2 = centerX + Math.cos(i) * (radius + i);
//     let y2 = centerY + Math.sin(i) * (radius + i);
//     let lineColor = "rgb(" +i+50 + "," + i+20 + "," + i+1 + ")";
//     context.strokeStyle = lineColor;
//     context.beginPath();
//     context.moveTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.stroke();
//     // Circle
//     context.beginPath();
//     context.arc(centerX, centerY, radius, 0, 2*Math.PI);
//     context.stroke();
//   }
//   requestAnimationFrame(seeBeats);
// }

// Music Play functions
function play1() {
  audio_info1.volume = 0.7;
  audio_info1.play();
};

function stop1() {
  audio_info1.pause();
};

function play2() {
  audio_info2.volume = 0.7;
  audio_info2.play();
};

function stop2() {
  audio_info2.pause();
};

function play3() {
  audio_info3.volume = 0.7;
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
  if (timer) {
    if (easy.className === "selected") {
      timeLeft = 10
    } else if (hard.className === "selected") {
      timeLeft = 7
    } else {
      timeLeft = 5
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
    playMusic();
    // seeBeats();
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
    playMusic()
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