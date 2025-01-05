"use strict";

(function () {
  var userName = prompt("please enter your user name").trim();

  if (
    !userName ||
    (typeof parseInt(userName) === "number" && !isNaN(parseInt(userName))) ||
    typeof userName !== "string" ||
    userName.split(" ").every((char) => char === "")
  )
    throw new Error("please enter a valid user name");

  console.log(`Welcome ${userName} to our page`);

  var userGrades = prompt(
    "please enter your 4 grades and seperate them with ',' and NO SPACES inside the grades"
  );

  var userGradesArr = userGrades
    .trim()
    .split(",")
    .map((grade) => parseFloat(grade))
    .filter((grade) => grade !== "");

  if (
    userGradesArr.some((grade) => isNaN(grade)) ||
    userGradesArr.length !== 4 ||
    userGradesArr.some((grade) => grade > 100 || grade < 0)
  ) {
    throw new Error("please enter valid grades");
  }

  console.table(userGradesArr);

  var averageGrade =
    userGradesArr.reduce((acc, currVal) => acc + currVal, 0) /
    userGradesArr.length;

  console.log(averageGrade);
})();
