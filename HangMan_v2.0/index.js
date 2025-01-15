import { wordData } from "./src/data/words-data.js";
import { Game } from "./src/game.js";

document.addEventListener("DOMContentLoaded", () => {
  window.game = new Game(wordData);
});
