const express = require('express');
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
public_users.get('/',function (req, res) {
  //Write your code here
  public_books_available = books.filter((book) => {
    return book.available === true;
  });
  return res.status(300).json({message: "Available books", books: public_books_available});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  public_books_by_isbn = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  return res.status(300).json({message: "Books by ISBN", books: public_books_by_isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  books_by_author = books.filter((book) => {
    return book.author === req.params.author;
  });
  return res.status(300).json({message: "Books by author", books: books_by_author});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  books_by_title = books.filter((book) => {
    return book.title === req.params.title;
  });
  return res.status(300).json({message: "Books by title", books: books_by_title});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  books_review = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  return res.status(300).json({message: "Books reviews by ISBN", books: books_review});
});



module.exports.general = public_users;
