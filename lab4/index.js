"use strict";

// 1. First task

Array.prototype.average = function () {
  if (this.length === 0) throw new Error("ERROR: this is an empty array");
  if (this.some((ele) => isNaN(+ele))) {
    throw new Error("ERROR: this array doesn't have only numbers");
  }

  return (
    this.reduce((acc, currVal) => acc + parseInt(currVal), 0) / this.length
  );
};

// TEST CASES
// var testArr = []; // ERROR: this is an empty array
// var testArr = [1, 2, 3, "4"]; // 2.5
// var testArr = [1, 2, 3, "ahmed"]; // ERROR: this array doesn't have only numbers
// var testArr = [1, 2, 3, 4, 5, 6]; // 3.5
// console.log(testArr.average());

////////////////////////////////////

// 2. A-changing toString functionality

Object.prototype.toString = function () {
  return "This is an object";
};

var testObject = { fname: "Ahmed" };

console.log(testObject.toString());

//   B- making String(obj) special
var anotherTest = { message: "This is a message" };
anotherTest.toString = function () {
  return this.message;
};

console.log(String(anotherTest));

///////////////////////////////////////////////////

// 3 creating Vehicle and Car

// Vehicle constructor
function Vehicle(type, speed) {
  if (Vehicle.count >= 50) {
    throw new Error("Vehicle limit reached");
  }
  this.type = type;
  this.speed = speed;
  Vehicle.count++;
}

// Static counter
Vehicle.count = 0;

// Vehicle prototype methods
Vehicle.prototype.start = function () {
  console.log("Vehicle started");
};

Vehicle.prototype.stop = function () {
  console.log("Vehicle stopped");
};

// Car constructor
function Car(type, speed) {
  Vehicle.call(this, type, speed);
}

// Inherit from Vehicle
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Add Car specific method
Car.prototype.drive = function () {
  console.log("Car is driving");
};

// Two ways to check if object is Car instance
function isCarInstance(obj) {
  // Method 1: Using instanceof
  console.log("Using instanceof:", obj instanceof Car);

  // Method 2: Using isPrototypeOf
  console.log("Using isPrototypeOf:", Car.prototype.isPrototypeOf(obj));
}

// Test code
var myCar = new Car("sedan", 120);
isCarInstance(myCar);
