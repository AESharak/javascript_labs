"use strict";

class Vehicle {
  static count = 0;
  static LIMIT = 50;

  constructor(type, speed) {
    if (Vehicle.count >= Vehicle.LIMIT) {
      throw new Error("Vehicle limit reached");
    }
    this.type = type;
    this.speed = speed;
    Vehicle.count++;
  }

  start() {
    console.log("the vehicle Started");
  }

  stop() {
    console.log("the vehicle stopped");
  }
}

class Car extends Vehicle {
  constructor(type, speed) {
    super(type, speed);
  }

  drive() {
    console.log("this car is driven by JavaScript");
  }
}

function checkCarInstance(obj) {
  console.log(obj instanceof Car);
  console.log(obj.prototype.constructor === Car);
}

try {
  const car = new Car("Mercedes", 150);
  const vehicle = new Vehicle("Audi", 200);

  checkCarInstance(car);
  checkCarInstance(vehicle);

  for (let i = 0; i < 49; i++) {
    new Vehicle("new car", 100);
  }
  new Vehicle("not created car", 10000);
} catch (error) {
  console.log(error.message);
}

/////////////////////////////////////////////////////////////

/// showError(message) implementation

function showError(message) {
  const errorBody = document.getElementById("errorContainer");
  errorBody.textContent = message;
  errorBody.classList.add("show");
}

// async fetchData() implmenation
async function fetchData() {
  try {
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments"),
    ]);
    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();
    const commentsData = await commentsResponse.json();

    displayUsersTable(usersData, postsData, commentsData);
  } catch (e) {
    showError("Failed to fetch data. Please try again later.");
  }
}

// displayUserData implmentation
function displayUsersTable(users, posts, comments) {
  const tableBody = document.getElementById("userTableBody");

  users.forEach((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);

    const userCommentsUI = userPosts
      .map((post) => {
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );
        return `<li>${post.title} (${postComments.length} comments)</li>`;
      })
      .join("");

    const lat = parseFloat(user.address.geo.lat).toFixed(2).toString();
    const lng = parseFloat(user.address.geo.lng).toFixed(2).toString();

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td class="email">${user.email}</td>
      <td>${user.company.name}</td>
      <td>Lat: ${lat} <br /> <br /> Lng: ${lng}</td>
      <td class="posts">
        <ul>
          ${userCommentsUI}
        </ul>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// fetchData invocation
fetchData();
