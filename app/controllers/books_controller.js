const express = require('express');
const BooksController = express.Router();
const { Book } = require('../models/book');

//localhost:3000/books/1
BooksController.get("/:id",(req,res)=>{
  console.log(req.params.id)
  console.log(Book.findOneById(req.params.id));
  res.send(Book.findOneById(req.params.id)) 
})


//localhost:3000/books/
BooksController.get("/",(req,res)=>{
  res.send(Book.findAll())    
})



module.exports = {
  BooksController: BooksController 
}