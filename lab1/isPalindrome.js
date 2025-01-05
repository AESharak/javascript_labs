"use strict";

/**
 *
 * @param {string} word
 * @returns {boolean} if palindrome or not
 */

function isPalindrome(word) {
  if (!word || word.length === 0 || typeof word !== "string") return false;

  var reversed = word.toLowerCase().split("").reverse().join("");

  if (word !== reversed) return false;

  return true;
}

console.log(isPalindrome("aha"));
