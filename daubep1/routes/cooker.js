const path = require('path');

const express = require('express');

const cookerController = require('../controllers/cooker');

const isAuth = require('../middleware/is-auth');

const router = express.Router();



router.get('/products', isAuth, cookerController.getProducts);

router.get('/editProduct/:productId', isAuth, cookerController.getEditProduct);

router.post('/editProduct', isAuth, cookerController.postEditProduct);

router.get('/orders', isAuth, cookerController.getOrders);

router.get('/editOrder', isAuth, cookerController.getEditOrder);

router.get('/', isAuth, cookerController.getProducts);

module.exports = router;

