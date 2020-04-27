const express = require('express');
const OrdersController = express.Router();
const { Order } = require('../models/order');
const { AuthenticateUser } = require('../middlewares/authentication');
const shortHash = require('shorthash');

//GET /orders
OrdersController.get('/', AuthenticateUser, function(req,res){
  const userPresent = req.user;
  Order.find({user: userPresent._id}).then((orders)=>{
    res.send({
        "msg": "Full of the Orders in an array",
        "orders": orders
    })        
  }).catch((err)=>{
    res.send(err);  
  })
})

//POST /orders this is to place the order from the cart of the user
OrdersController.post('/', AuthenticateUser, function(req, res){
  const currentUser = req.user 
  let order = new Order();
  // ensuring that the current order belongs to the user
  order.user = currentUser._id;
  order.order_number = `DCT-ORDER-${shortHash.unique("asfas")}`;
  order.name = `DCT-ORDER-NAME-${shortHash.unique("sadfas sdfasdf")}`;
  order.total_amount = 0.0;
  order.save().then(function(order){
      res.send({
          order: order, 
          notice: 'successfully created an order'
      })
  }).catch(function(err){
      res.send(err)
  })
})

module.exports = {
  OrdersController
}