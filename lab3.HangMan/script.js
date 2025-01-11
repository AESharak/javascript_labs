// Main DOM ELEMENTS
var keyboardSection = document.getElementById("keyboard");
var wordDisplayDiv = document.getElementById("word-area");
var hintPart = document.getElementById("hintContent");
var guessesCountDisplay = document.getElementById("wrongGuesses");
var hangManImage = document.querySelector(".hangman-img img");
var gameModalSection = document.getElementById("finishedModal");
var playAgainButton = document.getElementById("playAgain");
var difficultyModal = document.getElementById("difficultyModal");
var difficultyBtns = document.querySelectorAll(".difficulty-btn");
var timerDisplay = document.getElementById("timerDisplay");
var showHintButton = document.getElementById("showHint");
var hintContainer = document.querySelector(".hint");
var categoryText = document.getElementById("categoryText");

// assistant variable
var selectedDifficulty = "";
var timeLeft = 60;
var timer;
var currentWord = "",
  correctLetters,
  wrongGuesses,
  maxWrongGuesses = 6;
var currentWordObj = null;
var isHintUsed = false;
var baseTime = 60;
var selectedCategory = "";
var lastWord = "";

function resetGameState() {
  correctLetters = [];
  wrongGuesses = 0;
  isHintUsed = false; // Reset hint state
  timeLeft = baseTime; // Reset to base time (60s)
  startTimer();
  hintContainer.style.display = "none";
  showHintButton.style.display = "block";

  wordDisplayDiv.innerHTML = currentWord
    .split("")
    .map(function () {
      return "<li class='letter'></li>";
    })
    .join("");

  hintPart.textContent = currentWordObj.hint;

  keyboardSection.querySelectorAll("button").forEach(function (key) {
    key.disabled = false;
  });
  guessesCountDisplay.textContent = wrongGuesses + " / " + maxWrongGuesses;
  hangManImage.src = "./assets/images/hangman-" + wrongGuesses + ".svg";
  gameModalSection.classList.remove("show");
}

function generateRandomWord() {
  var categories = ["animals", "fruits", "celebrities", "countries", "sport"];
  resetGame();
  var randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  var currentWordData =
    wordData[randomCategory][
      Math.floor(Math.random() * wordData[randomCategory].length)
    ];

  currentWord = currentWordData.word;

  hintPart.textContent = currentWordData.hint;
  wordDisplayDiv.innerHTML = currentWordData.word
    .split("")
    .map(function () {
      return "<li class='letter'></li>";
    })
    .join("");
}

function gameOver(finishedStatus) {
  clearInterval(timer);
  setTimeout(function () {
    var modalText = finishedStatus ? "You found the word!" : "Game Over!";
    gameModalSection.querySelector("img").src =
      "./assets/images/" + (finishedStatus ? "victory" : "lost") + ".gif";
    gameModalSection.querySelector("h3").textContent = finishedStatus
      ? "Congratulations!"
      : "Game Over!";
    gameModalSection.querySelector("p").innerHTML =
      modalText + " <span>" + currentWord + "</span>";
    gameModalSection.classList.add("show");
  }, 250);
}

function clickAKey(key, letterClicked) {
  if (currentWord.includes(letterClicked)) {
    currentWord.split("").forEach(function (letter, index) {
      if (letter === letterClicked) {
        correctLetters.push(letter);
        wordDisplayDiv.querySelectorAll("li")[index].textContent = letter;
        wordDisplayDiv.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuesses++;
    hangManImage.src = "./assets/images/hangman-" + wrongGuesses + ".svg";
  }

  // Reset timer after each guess (correct or wrong)
  timeLeft = isHintUsed ? 30 : 60;
  startTimer();

  guessesCountDisplay.textContent = wrongGuesses + " / " + maxWrongGuesses;
  key.disabled = true;

  if (wrongGuesses === maxWrongGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

generateRandomWord();

for (var j = 97; j <= 122; j++) {
  var key = document.createElement("button");
  key.innerText = String.fromCharCode(j);
  keyboardSection.appendChild(key);
  (function (currentJ) {
    key.addEventListener("click", function (e) {
      clickAKey(e.target, String.fromCharCode(currentJ));
    });
  })(j);
}

playAgainButton.addEventListener("click", function () {
  playAgainButton.disabled = true;
  gameModalSection.classList.remove("show");
  difficultyModal.style.display = "flex";
});

function getCategoryFromWord(word) {
  for (var category in wordData) {
    if (
      wordData[category].some(function (item) {
        return item.word === word;
      })
    ) {
      return category;
    }
  }
  return "";
}

function initializeSelections() {
  var categoryBtns = document.querySelectorAll(".category-btn");

  categoryBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectedCategory = this.dataset.category;
      categoryBtns.forEach(function (b) {
        b.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  Array.prototype.forEach.call(difficultyBtns, function (btn) {
    btn.addEventListener("click", function () {
      if (!selectedCategory) {
        alert("Please select a category first!");
        return;
      }

      selectedDifficulty = this.dataset.level;
      difficultyModal.style.display = "none";
      playAgainButton.disabled = false;

      var availableWords = wordData[selectedCategory].filter(function (word) {
        return word.level === selectedDifficulty && word.word !== lastWord;
      });

      currentWordObj =
        availableWords[Math.floor(Math.random() * availableWords.length)];
      currentWord = currentWordObj.word;
      lastWord = currentWord; // Store current word
      categoryText.textContent =
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      resetGameState();
    });
  });
}

function resetGame() {
  difficultyModal.style.display = "flex";
}

function startGame() {
  var allWords = []
    .concat(wordData.animals)
    .concat(wordData.fruits)
    .concat(wordData.celebrities)
    .concat(wordData.countries)
    .concat(wordData.sport);

  var availableWords = allWords.filter(function (word) {
    return word.level === selectedDifficulty;
  });

  currentWord =
    availableWords[Math.floor(Math.random() * availableWords.length)].word;
  resetGameState();
}

function startTimer() {
  clearInterval(timer);
  timerDisplay.textContent = timeLeft;
  timer = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver(false);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
}

showHintButton.addEventListener("click", function () {
  if (timeLeft >= 30) {
    isHintUsed = true;
    timeLeft = 30;
    startTimer();
    hintContainer.style.display = "block";
    showHintButton.style.display = "none";
  } else {
    alert("Not enough time left to use hint!");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  initializeSelections();
  difficultyModal.style.display = "flex";
  playAgainButton.disabled = true;
});

function updateCategory(category) {
  categoryText.textContent =
    category.charAt(0).toUpperCase() + category.slice(1);
}
