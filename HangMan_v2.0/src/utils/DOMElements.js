export class DOMElements {
  static getElements() {
    return {
      keyboard: document.getElementById("keyboard"),
      wordArea: document.getElementById("word-area"),
      hintContent: document.getElementById("hintContent"),
      wrongGuesses: document.getElementById("wrongGuesses"),
      hangmanImg: document.querySelector(".hangman-img img"),
      finishedModal: document.getElementById("finishedModal"),
      playAgain: document.getElementById("playAgain"),
      difficultyModal: document.getElementById("difficultyModal"),
      difficultyBtns: document.querySelectorAll(".difficulty-btn"),
      timerDisplay: document.getElementById("timerDisplay"),
      showHint: document.getElementById("showHint"),
      hint: document.querySelector(".hint"),
      categoryText: document.getElementById("categoryText"),
    };
  }
}
