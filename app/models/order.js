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

orderSchema.pre('save',function(){
  let order = this;
  let currentUserId = this.user;
  let orderPrice = 0.0;
  console.log("inside the pre save block");
  order.total_amount = orderPrice;
  User.findById(currentUserId)
    .then(function(userRecord){
      console.log(userRecord)
      console.log(userRecord.cartItems.map((cartItem)=>{ console.log(cartItem.product) }))
      console.log('found the user');
      userRecord.cartItems.forEach(function(cartItem){
        Product.findById(cartItem.product._id).then(function(product){
          let orderLineItem = {
            product: product._id,
            quantity: product.quantity,
            price: product.price
          }
          order.total_amount = order.total_amount + (cartItem.product.quantity * cartItem.product.price);
          order.orderLineItems.push(orderLineItem)
        })  
      })
    })
    .catch(function(err){
      console.log(err);
    })
  next()
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {
  Order
}