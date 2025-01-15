export class Modal {
  static showGameOver(modal, isWin, word) {
    const modalText = isWin ? "You found the word!" : "Game Over!";

    modal.querySelector("img").src = `./assets/images/${
      isWin ? "victory" : "lost"
    }.gif`;

    modal.querySelector("h3").textContent = isWin
      ? "Congratulations!"
      : "Game Over!";

    modal.querySelector("p").innerHTML = `${modalText} <span>${word}</span>`;
    modal.classList.add("show");
  }

  static showDifficultyModal(modal) {
    modal.style.display = "flex";
  }

  static hideDifficultyModal(modal) {
    modal.style.display = "none";
  }

  static hideGameOverModal(modal) {
    modal.classList.remove("show");
  }
}
