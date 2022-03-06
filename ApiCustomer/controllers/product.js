const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');
const User = require('../models/user');


const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  console.log(req.userId);
    Product.find()
      .then(products => {
        res.status(200).json({
          message: 'Fetched posts successfully.',
          products: products
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };