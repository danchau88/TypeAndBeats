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

// Timer Bar
let innerDivBar = document.getElementById('timebar-left');
let divTimerBar = document.getElementById('timer-bar');
// Different lengths for difficulty settings

let startTimer; 
let amountTime;
function startBarCount() {
  if (master.className === 'selected') {
    amountTime = 11;
  } else if (hard.className === 'selected') {
    amountTime = 17;
  } else {
    amountTime = 22;
  }
  innerDivBar.style.width = 0
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

// IGNORE THIS
// My lost attempt Audio Visualizer
// Sound Visualizer variables
// var audio, canvas, context, audioctx, analyser, oscillator, freqArr, barHeight, source;
// var bigBars = 0;
// var colorStyle = 0;
// var pastIndex = 900;
// var WIDTH = 600;
// var HEIGHT = 180;
// var INTERVAL = 128;//256;
// var SAMPLES = 2048;//4096;//1024;//512;//2048; //this is the main thing to change right now
// var r = 0;
// var g = 0;
// var b = 255;
// var x = 0;

//Visualizer Functions
// function initialize(){
//   canvas = document.getElementById("cnv1"); //drawing the canvas
//   context = canvas.getContext("2d");
//   // audio = document.getElementById("audio1");
//   // audio.volume = .5;
//   //audio.src = document.getElementById("audioFile");
//   console.log(audio_info1);
//   audio_info1.source = URL.createObjectURL(); //this is to make url for audio (CORS bug)
//   console.log(audio_info1);
  
//   audioctx = audioctx || new AudioContext(); //setting up audio analyzer to get frequency info
//   analyser = audioctx.createAnalyser();
//   analyser.fftSize = SAMPLES;
  
//   oscillator = audioctx.createOscillator();
//   oscillator.connect(audioctx.destination);

//   // source = audioctx.createMediaElementSource(audio_info1);
//   source = source || audioctx.createMediaElementSource(audio_info1);   
//   source.connect(analyser);
//   source.connect(audioctx.destination);

//   freqArr = new Uint8Array(analyser.frequencyBinCount);

//   barHeight = HEIGHT;

//   requestAnimationFrame(draw);
// }

/*function maxIndex(arr){ //finds the highest-numbered index with a nonzero value
  var maxIndex = 0;
  for(var i = 1; i < arr.length; i++){
      if(arr[i] != 0){
          maxIndex = i;
      }
  }
  return maxIndex;
}*/

// function draw(){
//   if(!audio_info1.paused){
//       bigBars = 0;
//       r = 0;
//       g = 0;
//       b = 255;
//       x = 0;
//       context.clearRect(0,0,WIDTH, HEIGHT);
//       analyser.getByteFrequencyData(freqArr);
//       for(var i = 0; i < INTERVAL; i++){
//         if(/*i <= 50 &&*/ barHeight >= (240 /* currVol*/)){
//             bigBars++;
//         }
//         //max = 900; //default placeholder
//         var num = i;
//         barHeight = ((freqArr[num] - 128) * 2) + 2;
//         if(barHeight <= 1){
//             barHeight = 2;
//         }
        
//         r = r + 10; //this is for the color spectrum
//         if(r > 255){
//             r = 255;
//         }
//         g = g + 1;
//         if(g > 255){
//             g = 255;
//         }
//         b = b - 2;
//         if(b < 0){
//         b = 0;
//         }
        
//         if(colorStyle === 0){
//             context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; //rgb color cycle 
//         }

//         context.fillRect(x, HEIGHT - barHeight, (WIDTH/INTERVAL) - 1 , barHeight);
//         x = x + (WIDTH/INTERVAL);
//       }
//   }
//   requestAnimationFrame(draw);
// }
