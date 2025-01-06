"use strict";

/**
 *
 * @param {string} sentence
 * @returns
 */

/**
 *
 * @param {string} sentence
 * @returns {object} containing all vowels
 * @throws {Error} when you enter an invalid input
 */
function calcNoVowels(sentence) {
  if (!sentence || sentence.trim() === "") {
    throw new Error("please enter a valid number");
  }
  var initialValue = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0,
  };

  const result = sentence
    .toLowerCase()
    .split("")
    .reduce(function (acc, curr) {
      switch (curr) {
        case "a":
          acc.a++;
          break;
        case "e":
          acc.e++;
          break;
        case "i":
          acc.i++;
          break;
        case "o":
          acc.o++;
          break;
        case "u":
          acc.u++;
          break;
      }
      return acc;
    }, initialValue);

  console.log(result);
  return result;
}

calcNoVowels("ahmed essam mohamed");
// calcNoVowels("        ");
// calcNoVowels();
