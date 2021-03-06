const express = require('express');
const router = express.Router();
const { BooksController } = require('../app/controllers/books_controller');
const { UsersController } = require('../app/controllers/users_controller');
const { CategoriesController } = require('../app/controllers/categories_controller');
const { ProductsController } = require('../app/controllers/products_controller');
const { OrdersController } = require('../app/controllers/orders_controller');
router.use('/books', BooksController);
router.use('/users', UsersController);
router.use('/categories', CategoriesController);
router.use('/products', ProductsController);
router.use('/orders', OrdersController);
module.exports = {
  router: router
}