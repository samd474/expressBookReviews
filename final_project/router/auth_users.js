const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
if(username === )
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  if(users.username === username && users.password === password){
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  if(authenticatedUser(req.body.username,req.body.password)){
    return res.status(200).json({message: "User logged in successfully"});
  } else {
    return res.status(400).json({message: "Invalid username or password"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
public_users.put('/review/:isbn',function (req, res) {
  //Write your code here
  post_review = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  return res.status(300).json({message: "Add book review", books: post_review});
});  
});

//Update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
public_users.put('/review/:isbn',function (req, res) {
  //Write your code here
  update_review = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  return res.status(300).json({message: "Update book review", books: update_review});
});  
});

//Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
public_users.delete('/review/:isbn',function (req, res) {
  //Write your code here
  delete_review = books.filter((book) => {
    return book.isbn === req.params.isbn;
  });
  confirm_delete = books.filter((book) => {
    return book.isbn !== req.params.isbn;
  });
  
  if(delete_review === confirm_delete){
    return res.status(200).json({message: "Review deleted successfully"});
  } else {
    return res.status(400).json({message: "Review not deleted"});
  };
  return res.status(300).json({message: "Delete book review", books: delete_review});
});  
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
