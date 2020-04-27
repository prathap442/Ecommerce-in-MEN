const express = require('express');
const OrdersController = express.Router();
const { Order } = require('../models/order');
const { AuthenticateUser } = require('../middlewares/authentication');

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

module.exports = {
  OrdersController
}