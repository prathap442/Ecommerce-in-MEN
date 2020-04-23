const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Product } = require('../models/product');
const categorySchema = new Schema({
  name:{
   type: String,
   unique: true,
   required: true
  },
  description: {
    type: String,
    unique: true,
    required: true
  }  
})

categorySchema.statics.findAllProductsForCategory = function(category_id){
  return Product.find({category: category_id})
}
  
const Category = mongoose.model('Category', categorySchema);


module.exports = {
  Category: Category
}