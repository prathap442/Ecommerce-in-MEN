const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User } = require('../models/user');
const { Product } = require('../models/product');
const orderSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  order_number: {
    type: String,
    required: true
  },
  orderLineItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total_amount: {
    type: Number,
    required: true  
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

orderSchema.pre('save',function(next){
  let currentOrder = this;
  let currentUserId = this.user;
  let orderPrice = 0.0;
  currentOrder.total_amount = orderPrice;
  User.findById(currentUserId)
    .then(function(userRecord){
      console.log(userRecord.cartItems);
      userRecord.cartItems.forEach(function(cartItem){
        Product.findById(cartItem.product)
        .then(function(product){
          console.log("inside the then block ")
          console.log(`${product}`)
          let orderLineItem = {
            product: String(product._id),
            quantity: cartItem.quantity,
            price: product.price
          }
          currentOrder.total_amount = currentOrder.total_amount + (orderLineItem.quantity * orderLineItem.price);
          currentOrder.orderLineItems.push(orderLineItem)
          console.log(currentOrder)
        })
        .catch(function(err){
          console.log(err);
        })  
      })
      next()
    })
    .catch(function(err){
      console.log(err);
    })
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {
  Order
}