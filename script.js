const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word?number=10";
const wordDisplay = document.getElementById('game-display');
const answerInput = document.getElementById('answer-input');

answerInput.addEventListener('input', () => {
  const arrWord = wordDisplay.querySelectorAll('span');
  const arrValue = answerInput.value.split('');

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

  if (correct) renderNextWord()
})

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

renderNextWord();