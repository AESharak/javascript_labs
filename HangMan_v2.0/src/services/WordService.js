export class WordService {
  constructor(wordData) {
    this.wordData = wordData;
  }

  getWord(category, difficulty, lastWord) {
    const availableWords = this.wordData[category].filter(
      (word) => word.level === difficulty && word.word !== lastWord
    );
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }

  renderPlaceHolders(word) {
    return word
      .split("")
      .map(() => `<li class='letter'></li>`)
      .join("");
  }
}
