const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { // returns boolean
  // write code to check if the username is valid
  for (let user of users) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
};

const authenticatedUser = (username, password) => { // returns boolean
  // write code to check if username and password match the one we have in records.
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
};

// only registered users can login
regd_users.post("/login", (req, res) => {
  // Write your code here
  if (authenticatedUser(req.body.username, req.body.password)) {
    return res.status(200).json({ message: "User logged in successfully" });
  } else {
    return res.status(400).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.body.username; 

  // Find the book by ISBN
  const book = books.find(book => book.isbn === isbn);

  if (book) {
    // Add the review to the book
    if (!book.reviews) {
      book.reviews = [];
    }
    book.reviews.push({ username, review });

    return res.status(200).json({ message: "Review added successfully", book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports = regd_users;
