"use strict";
var myFavouriteMovies = [
  "12 Angry Men",
  "Coco",
  "The Green Mile",
  "The Shashank Redemption",
  "The Intouchables",
  "Fight Club",
  "The Prestige",
];

// a. copy the array into a different Variable
var myMovies = [...myFavouriteMovies];

// b. replce the third element with a different movie
myFavouriteMovies[2] = "Your Name";

// c. return the last array item in 3 different ways
var lastArrayItem1 = myMovies[myMovies.length - 1];
var lastArrayItem3 = myMovies.at(-1);
var lastArrayItem2 = myMovies.slice(myMovies.length - 1, myMovies.length)[0];
var lastArrayItem4 = myMovies.slice().pop();

console.log(lastArrayItem1);
console.log(lastArrayItem2);
console.log(lastArrayItem3);
console.log(lastArrayItem4);
// console.log(myMovies); //for safety check

// d. add a new movie to the beginning
myFavouriteMovies.unshift("3 Idiots");
console.log(myFavouriteMovies);
