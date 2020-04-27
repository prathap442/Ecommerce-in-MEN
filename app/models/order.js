const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  order_number: {
    type: String,
    required: true
  },
  orderLineItems: [{
    type: Schema.Types.ObjectId,
    ref: 'CartLineItem',    
  }],
  total_amount: {
    type: String,
    required: true  
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {
  Order
}