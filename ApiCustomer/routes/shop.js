const express = require('express');
const { body } = require('express-validator/check');

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /cart
// Lấy ra giỏ hàng
router.get('/cart', isAuth, shopController.getCart);

// Add một item vào trong giỏ hàng với productId
router.post('/cart', isAuth, shopController.postCart);

router.post('/decr_cart', isAuth, shopController.postDecrCart);


// Xóa một item trong giỏ hàng với productId
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// Add vào bảng order với tất cả các sản phẩm đang có trong giỏ hàng
// Giỏ hàng về rỗng 
router.post('/create-order', isAuth, shopController.postOrder);

// Get 1 order với orderId
router.get('/orders/:orderId', isAuth, shopController.getOneOrder);

// Get tất cả orders của người dùng đang đăng nhập
router.get('/getOrders', isAuth, shopController.getOrders);

module.exports = router;