const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/show => GET
// router.get('/show',  adminController.showAdmin);

// /admin/show => GET
router.get('/showProducts', isAuth, adminController.showProducts);


// router.get('/add-product', isAuth, adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', isAuth, adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', isAuth, adminController.postAddProduct);

// /admin/addNewProduct => GET
router.get('/addNewProduct', isAuth, adminController.getAddNewProduct);

// /admin/addNewProduct => POST
router.post('/addNewProduct', isAuth, adminController.postAddProduct);

// /admin/editProduct => Get
router.get('/editProduct/:productId', isAuth, adminController.getEditProduct);

router.post('/editProduct', isAuth, adminController.postEditProduct);

// router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get('/orders',isAuth,  adminController.getOrders);
router.post('/search_date',isAuth,  adminController.search_date);

router.get('/', isAuth, adminController.showProducts);

module.exports = router;

