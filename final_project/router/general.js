const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to validate user data
function isValid(username, password) {
  // Add your validation logic here (e.g., check if username is unique, password strength, etc.)
  if (!username || !password) return false;
  return true;
}

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (isValid(username, password)) {
    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Add the new user to the users array
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
  } else {
    return res.status(400).json({ message: "Invalid username or password" });
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const public_books_available = books.filter((book) => {
    return book.available === true;
  });
  return res.status(200).json({ message: "Available books", books: public_books_available });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const response = await axios.get(`https://api.example.com/books/isbn/${req.params.isbn}`);
    const book = response.data;

    if (book) {
      return res.status(200).json({ message: "Book details by ISBN", book });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book details", error: error.message });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  new Promise((resolve, reject) => {
    const books_by_author = books.filter((book) => {
      return book.author === req.params.author;
    });
    if (books_by_author.length > 0) {
      resolve(books_by_author);
    } else {
      reject("No books found by this author");
    }
  })
  .then((books_by_author) => {
    res.status(200).json({ message: "Books by author", books: books_by_author });
  })
  .catch((error) => {
    res.status(404).json({ message: error });
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  new Promise((resolve, reject) => {
    const books_by_title = books.filter((book) => {
      return book.title === req.params.title;
    });
    if (books_by_title.length > 0) {
      resolve(books_by_title);
    } else {
      reject("No books found with this title");
    }
  })
  .then((books_by_title) => {
    res.status(200).json({ message: "Books by title", books: books_by_title });
  })
  .catch((error) => {
    res.status(404).json({ message: error });
  });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const books_review = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  return res.status(200).json({ message: "Books reviews by ISBN", books: books_review });
});

module.exports = public_users;
