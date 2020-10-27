class Dictionary{
  generateRandomWords() {
      const randomWord = require('random-words');
      return randomWord();
  }
}

export default Dictionary;