const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//In the Schema there exist the Schema class out of 
//which we can create out own instances
const CartLineItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'  
  },
  quantity: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
})

const CartLineItem = mongoose.model('CartLineItem',CartLineItemSchema);

module.exports = {
  CartLineItem,
  CartLineItemSchema
}