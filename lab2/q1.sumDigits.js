"use strict";

/**
 *
 * @param {number} number
 * @throws {Error} when invalid input
 * @returns {number} the sume of each digit
 */
function calcDigitsSum(number) {
  if (!number || isNaN(number) || parseInt(number) < 0) {
    throw new Error("please enter a valid number");
  }

  return (number + "").split("").reduce(function (acc, currVal) {
    return acc + parseInt(currVal);
  }, 0);
}

console.log(calcDigitsSum(4343));
