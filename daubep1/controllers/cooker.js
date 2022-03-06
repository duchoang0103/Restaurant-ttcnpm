const Product = require('../models/product');
const Order = require('../models/order');
var moment = require('moment');

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/showProducts');
    })
    .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  Product.find()
    
    .then(products => {
     
      res.render('cooker/showProducts', {
        prods: products,
        pageTitle: 'Cooker Products',
        path: '/cooker/showProducts',
        username: (req.session.cooker) ? req.session.cooker.email : "null"
      });
    })
    .catch(err => console.log(err));
};

///
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('cooker/editProduct', {
        pageTitle: 'Edit Product',
        path: '/cooker/editProduct',
        editing: editMode,
        product: product,
        username: (req.session.cooker) ? req.session.cooker.email : "null"
      });
    })
    .catch(err => console.log(err));
};

///
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  // const updatedDesc = req.body.description;
  // const updatedcategory = req.body.category;
  const updatedstatus = req.body.status;
  const updatedquantity = req.body.quantity;
  Product.findById(prodId)
    .then(product => {
      // product.title = updatedTitle;
      // product.price = updatedPrice;
      // product.description = updatedDesc;
      // product.imageUrl = updatedImageUrl;
      // product.category = updatedcategory;
      product.status = updatedstatus;
      product.quantity = updatedquantity;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
  Order.find()
    .then(orders => {
      newOrders = [];
  
      for(let o of orders){
        var total = 0;
        for(let p of o.products){
          if(p.status > 0){
            total += p.quantity * p.product.price;
          }
        }
        newO = {...o._doc, total: total};
        newOrders.push(newO);
      }
            
      res.render('cooker/orders', {
        path: '/orders',
        pageTitle: 'Orders',
        orders: newOrders,
        moment: moment,
        date_from: new Date(),
        date_to: new Date(),
        username: (req.session.cooker) ? req.session.cooker.email : "null"
      });
    })
    .catch(err => console.log(err));
};

exports.getEditOrder = (req, res, next) => {
  const editMethod = req.query.editMethod; // 1. Tăng 1, 2. Giảm 1, 3. Hủy, 4. Hoàn thành
  const prodId = req.query.productId;
  const orderId = req.query.orderId;
  const hide = req.query.hide;
  console.log("hide");
  console.log(hide);
  console.log(req.query);
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return res.redirect('/');
      }
      if(hide){
        console.log("Đã ẩn.");
        order.status = -1;
        console.log(order.status);
      }
      
      else{
        for (var p of order.products) {
          console.log(p.product._id.toString());
          console.log(prodId.toString());
          if (p.product._id.toString() === prodId.toString()) {
            if (editMethod === "1") {
              // Tăng 1
              console.log("Tăng 1");
              p.quantity = p.quantity + 1;
            }
            if (editMethod === "2") {
              // Giảm 1
              console.log("Giảm 1");
              p.quantity = p.quantity - 1;
            }
            if (editMethod.toString() === "3") {
              // Hoàn tất
              console.log("Hoàn tất");
              p.status = 2;
  
  
            }
            if (editMethod.toString() === "4") {
              // Hủy món
              console.log("Hủy món");
              p.status = -1;

  
            }
          }
        }
      }
      
      console.log(order);
      order.save().then(order => {
        return res.redirect('/orders#' + order._id);
      }
      ).catch(err => console.log(err));

    })
    .catch(err => console.log(err));
};

///
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  // const updatedDesc = req.body.description;
  // const updatedcategory = req.body.category;
  const updatedstatus = req.body.status;
  const updatedquantity = req.body.quantity;
  Product.findById(prodId)
    .then(product => {
      // product.title = updatedTitle;
      // product.price = updatedPrice;
      // product.description = updatedDesc;
      // product.imageUrl = updatedImageUrl;
      // product.category = updatedcategory;
      product.status = updatedstatus;
      product.quantity = updatedquantity;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};