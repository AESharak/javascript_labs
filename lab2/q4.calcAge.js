"use strict";

function calcAge(birthDate) {
  var birthDateUnix = new Date();
  return Math.floor(
    (birthDateUnix - new Date(birthDate)) / 1000 / 3600 / 24 / 365
  );
}

console.log(calcAge("1997-09-27"));
