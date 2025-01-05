// Create initial movies array
const myMovies = [
  "The Godfather",
  "Inception",
  "The Dark Knight",
  "Pulp Fiction",
  "Fight Club",
];

// Copy array to new variable
const moviesCopy = [...myMovies];

// Replace third element (index 2)
moviesCopy[2] = "The Matrix";

// Get last array item in 3 different ways
const lastMovie1 = moviesCopy[moviesCopy.length - 1];
const lastMovie2 = moviesCopy.slice(-1)[0];
const lastMovie3 = moviesCopy.at(-1);

// Add new movie to beginning
moviesCopy.unshift("Interstellar");

// Log results
console.log("Original array:", myMovies);
console.log("Modified array:", moviesCopy);
console.log("Last movie (way 1):", lastMovie1);
console.log("Last movie (way 2):", lastMovie2);
console.log("Last movie (way 3):", lastMovie3);
