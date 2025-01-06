"use strict";

function calcOccurencesInSentence(sentence, char) {
  if (!sentence || !char) {
    throw new Error("please enter valid number");
  }
  var noOfOccurences = 0;
  for (var i = 0; i < sentence.length; i++) {
    if (sentence[i] === char) ++noOfOccurences;
  }
  return noOfOccurences;
}

console.log(calcOccurencesInSentence("ahmed essam mohamed", "s"));
