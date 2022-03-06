const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
