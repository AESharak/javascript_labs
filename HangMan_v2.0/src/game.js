import { DOMElements } from "./utils/DOMElements.js";
import { Timer } from "./components/Timer.js";
import { Keyboard } from "./components/Keyboard.js";
import { WordService } from "./services/WordService.js";
import { Modal } from "./components/Modal.js";

export class Game {
  constructor(wordData) {
    this.elements = DOMElements.getElements();
    this.wordService = new WordService(wordData);
    this.timer = new Timer(this.elements.timerDisplay, 60, () =>
      this.gameOver(false)
    );
    this.keyboard = new Keyboard(
      this.elements.keyboard,
      this.clickAKey.bind(this)
    );

    this.initializeGameState();
    this.setupEventListeners();
  }

  initializeGameState() {
    this.currentWord = "";
    this.correctLetters = [];
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 6;
    this.isHintUsed = false;
    this.selectedCategory = "";
    this.selectedDifficulty = "";
    this.lastWord = "";
  }

  setupEventListeners() {
    this.keyboard.setup();
    this.initializeSelections();
    this.setupPlayAgainButton();
    this.setupHintButton();
  }

  resetGameState() {
    this.correctLetters = [];
    this.wrongGuesses = 0;
    this.isHintUsed = false;

    this.elements.hint.style.display = "none";
    this.elements.showHint.style.display = "block";
    this.elements.wordArea.innerHTML = this.wordService.renderPlaceHolders(
      this.currentWord
    );
    this.elements.hintContent.textContent = this.currentWordObj.hint;

    this.keyboard.reset();
    this.timer.start(60);

    this.updateDisplay();
    this.elements.finishedModal.classList.remove("show");
  }

  clickAKey(key, letterClicked) {
    if (this.currentWord.includes(letterClicked)) {
      this.handleCorrectGuess(letterClicked);
    } else {
      this.handleWrongGuess();
    }

    this.timer.start(this.isHintUsed ? 30 : 60);
    key.disabled = true;
    this.updateDisplay();
    this.checkGameEnd();
  }

  handleCorrectGuess(letter) {
    this.currentWord.split("").forEach((char, index) => {
      if (char === letter) {
        this.correctLetters.push(char);
        const letterElements = this.elements.wordArea.querySelectorAll("li");
        letterElements[index].textContent = char;
        letterElements[index].classList.add("guessed");
      }
    });
  }

  handleWrongGuess() {
    this.wrongGuesses++;
    this.elements.hangmanImg.src = `./assets/images/hangman-${this.wrongGuesses}.svg`;
  }

  updateDisplay() {
    this.elements.wrongGuesses.textContent = `${this.wrongGuesses} / ${this.maxWrongGuesses}`;
  }

  checkGameEnd() {
    if (this.wrongGuesses === this.maxWrongGuesses) {
      this.gameOver(false);
    } else if (this.correctLetters.length === this.currentWord.length) {
      this.gameOver(true);
    }
  }

  setupPlayAgainButton() {
    this.elements.playAgain.addEventListener("click", () => {
      this.elements.playAgain.disabled = true;
      this.elements.finishedModal.classList.remove("show");
      this.elements.difficultyModal.style.display = "flex";
    });
  }

  gameOver(isWin) {
    this.timer.stop();
    setTimeout(() => {
      Modal.showGameOver(this.elements.finishedModal, isWin, this.currentWord);
    }, 250);
  }

  setupHintButton() {
    this.elements.showHint.addEventListener("click", () => {
      if (this.timer.timeLeft >= 30) {
        this.isHintUsed = true;
        this.timer.start(30);
        this.elements.hint.style.display = "block";
        this.elements.showHint.style.display = "none";
      } else {
        alert("Not enough time left to use hint!");
      }
    });
  }

  initializeSelections() {
    this.setupCategorySelection();
    this.setupDifficultySelection();
  }

  setupCategorySelection() {
    const categoryBtns = document.querySelectorAll(".category-btn");
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedCategory = btn.dataset.category;
        categoryBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  }

  setupDifficultySelection() {
    Array.from(this.elements.difficultyBtns).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!this.selectedCategory) {
          alert("Please select a category first!");
          return;
        }

        this.selectedDifficulty = btn.dataset.level;
        this.elements.difficultyModal.style.display = "none";
        this.elements.playAgain.disabled = false;

        this.currentWordObj = this.wordService.getWord(
          this.selectedCategory,
          this.selectedDifficulty,
          this.lastWord
        );

        this.currentWord = this.currentWordObj.word;
        this.lastWord = this.currentWord;

        this.elements.categoryText.textContent =
          this.selectedCategory.charAt(0).toUpperCase() +
          this.selectedCategory.slice(1);

        this.resetGameState();
      });
    });
  }
}
