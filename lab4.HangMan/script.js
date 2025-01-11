// Main DOM ELEMENTS
var keyboardSection = document.getElementById("keyboard");
var wordDisplayDiv = document.getElementById("word-area");
var hintPart = document.getElementById("hintContent");
var guessesCountDisplay = document.getElementById("wrongGuesses");
var hangManImage = document.querySelector(".hangman-img img");
var gameModalSection = document.getElementById("finishedModal");
var playAgainButton = document.getElementById("playAgain");

// Global Variables
var currentWord = "",
  correctLetters,
  wrongGuesses,
  maxWrongGuesses = 6;

function resetGame() {
  correctLetters = [];
  wrongGuesses = 0;
  wordDisplayDiv.innerHTML = currentWord
    .split("")
    .map(function () {
      return "<li class='letter'></li>";
    })
    .join("");
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

  console.log(
    currentWordData.word,
    currentWordData.hint,
    currentWordData.level
  );
  hintPart.textContent = currentWordData.hint;
  wordDisplayDiv.innerHTML = currentWordData.word
    .split("")
    .map(function () {
      return "<li class='letter'></li>";
    })
    .join("");
}

function gameOver(finishedStatus) {
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

playAgainButton.addEventListener("click", generateRandomWord);
