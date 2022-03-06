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

///////////////////////////

exports.showAdmin = (req, res, next) => {
  res.render('admin/admins');
};

exports.showProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('category', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/showProducts', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/showProducts',
        username: (req.session.user) ? req.session.user.email : "null"

      });
    })
    .catch(err => console.log(err));
};

exports.getAddNewProduct = (req, res, next) => {
  res.render('admin/addNewProduct', {
    pageTitle: 'Add Product',
    path: '/admin/addNewProduct',
    editing: false,
    username: (req.session.user) ? req.session.user.email : "null"
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const status = req.body.status;
  const quantity = req.body.quantity;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    quantity: quantity,
    category: category,
    status: status
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/showProducts');
    })
    .catch(err => {
      console.log(err);
    });
};

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
      res.render('admin/editProduct', {
        pageTitle: 'Edit Product',
        path: '/admin/editProduct',
        editing: editMode,
        product: product,
        username: (req.session.user) ? req.session.user.email : "null"
      });
    })
    .catch(err => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedQuantity = req.body.quantity;
  const updatedCategory = req.body.category;
  const updatedStatus = req.body.status;
  
  Product.findById(prodId)
    .then(product => {

      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      product.quantity = updatedQuantity;
      product.category = updatedCategory;
      product.status = updatedStatus;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/showProducts');
    })
    .catch(err => console.log(err));
};
///////////
exports.getOrders = (req, res, next) => {
  console.log('getOrders');
  
  Order.find()
    .then(orders => {
      
      res.render('admin/orders', {
        path: '/orders',
        pageTitle: 'Orders',
        orders: orders,
        moment: moment ,
        date_from: new Date(),
        date_to: new Date(),
        username: (req.session.user) ? req.session.user.email : "null"
      });
    })
    .catch(err => console.log(err));
};
exports.search_date = (req, res, next) => {
  console.log("search_date ");

  var date_from = req.body.date_from;
  var date_to = req.body.date_to;
  console.log("date_from " + date_from);
  console.log("date_to " + date_to);
  console.log("new Date: " + new Date().toString());
  
  // console.log(" moment().subtract(1, 'days'): " + typeof( moment().subtract(1, 'days')));
// {createAt: {$gte: new Date("10/06/2014")}}
  Order.find()
    .then(orders => {
      
      var newOrders = [];

      if(orders.length > 0){
        var date1 = new Date(date_from);
        console.log("date1.getTime.toString()");
        console.log(date1.toString());
        
        var date2 = new Date(date_to);
        for (const order of orders) {
          // console.log("order");
          // console.log(order);

          var date3 = new Date(order.createdAt.toString());
          if(date1.getTime() < date3.getTime() && date3.getTime() < date2.getTime() ){

            newOrders.push(order);
          }
        }
      }
      
      res.render('admin/orders', {
        path: '/orders',
        pageTitle: 'Orders',
        orders: newOrders,
        moment: moment ,
        date_from: new Date(date_from),
        date_to: new Date(date_to),
        username: (req.session.user) ? req.session.user.email : "null"
      });
    })
    .catch(err => console.log(err));
};
