const express = require('express');
const router = express.Router();
const { BooksController } = require('../app/controllers/books_controller');
router.use('/books', BooksController);

module.exports = {
  router: router
}