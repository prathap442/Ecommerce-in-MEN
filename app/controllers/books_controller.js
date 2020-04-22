const express = require('express');
const BooksController = express.Router();
const { Book } = require('../models/book');

//localhost:3000/books/
BooksController.get("/",(req,res)=>{
  res.send(Book.findAll())    
})

module.exports = {
  BooksController: BooksController 
}