const express = require('express');
const router = express.Router();
const { BooksController } = require('../app/controllers/books_controller');
const { UsersController } = require('../app/controllers/users_controller');
router.use('/books', BooksController);
router.use('/users', UsersController);

module.exports = {
  router: router
}