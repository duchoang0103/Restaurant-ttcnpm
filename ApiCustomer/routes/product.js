const express = require('express');
const { body } = require('express-validator/check');

const productController = require('../controllers/product');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /product/getProducts
router.get('/getProducts', isAuth, productController.getProducts);

// POST /feed/post

module.exports = router;
