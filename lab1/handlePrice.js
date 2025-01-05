"use strict";
/**
 *
 * @param {number} oldPrice
 * @param {number} discount
 * @returns {number} resulting price
 * @throws {Error} if Inputs are invalid
 *
 */
function calcPrice(oldPrice, discount) {
  var oldPriceNum = parseFloat(oldPrice);
  var discountNum = parseFloat(discount);

  if (isNaN(oldPriceNum) || isNaN(discountNum)) {
    throw new Error("please enter valid numbers");
  } else if (discountNum > 100 || discountNum < 0) {
    throw new Error("please enter a valid discount number between 1 to 100");
  }

  var result = oldPriceNum - (discountNum * oldPriceNum) / 100;
  return result.toFixed(2);
}

console.log(calcPrice("80.4", "20"));
