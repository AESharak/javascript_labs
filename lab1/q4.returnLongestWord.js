"use strict";

/**
 *
 * @param {string} sentence
 * @returns {string} longestWord in the setence
 * @throws {Error} when there's no given sentence or invalid input
 */

function returnLongestWordWithinAString(sentence) {
  if (
    !sentence ||
    typeof sentence !== "string" ||
    sentence.split(" ").every((char) => char === "")
  )
    throw new Error("please enter a valid sentence");
  var sentenceArr = sentence.split(" ");
  var longestWord = sentenceArr[0];

  for (var i = 0; i < sentenceArr.length; i++) {
    if (sentenceArr[i].length > longestWord.length)
      longestWord = sentenceArr[i];
  }

  return longestWord;
}

console.log(returnLongestWordWithinAString("   Web Developement Tutorial   "));
