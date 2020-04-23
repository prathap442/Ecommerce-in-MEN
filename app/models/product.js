const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product',productSchema)

module.exports = {
  Product: Product
}