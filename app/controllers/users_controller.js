const express = require('express');
const UsersController = express.Router();
const { User } = require('../models/user');
const { CartLineItem } = require('../models/cart_line_item');
const bcrypt = require('bcryptjs');

UsersController.get('/',function(req,res){
    User.find().then((users) => {
        res.send(users); 
    }).catch((err) => {
        res.send(err); 
    });
})


//localhost:3000/users/login POST
UsersController.post('/login',function(req,response){
  let userEmail = req.body.email;
  let userPasscode = req.body.password;
  console.log()
  User.findByCredentials(userEmail,userPasscode).then(function(user){
    response.send({"msg": "Successfully Logged In",user})
  }).catch(function(err){
    response.send(err);
  })
})

UsersController.post('/',function(req,res){ 
  var requestedBody = req.body;
  console.log(requestedBody)
  var user = new User(requestedBody);
  user.save().then(function(user){
    res.send({
      user: user,
      msg: "Successfully created the user"  
    })
  }).catch(function(err){
    res.send({msg: "cannot make you login", err});  
  })  
})

// PUT users/:id/cart_line_items
UsersController.put('/:id/cart_line_items',function(req,res){
  let userId = req.params.id;
  let cartLineItem = new CartLineItem();
  cartLineItem.product = req.body.product_id;
  cartLineItem.quantity = req.body.quantity;
 
  User.findById(userId).then((userFound)=>{
    let inCartItem;
    let userFoundCartItems= userFound.cartItems;
    let inCartItems = userFoundCartItems.filter(function(cartItem){
      return String(cartItem.product) == String(cartLineItem.product)
    })
    inCartItem = inCartItems[0];
    console.log(inCartItem);
    if(inCartItem){
      inCartItem.quantity = inCartItem.quantity + req.body.quantity
      res.send({"msg": "Update LineItem quantity in cart",userFound })
      User.findOneAndUpdate({ "_id": userId}, {cartItems: userFoundCartItems }).then((result)=>{
        res.send({"msg": "Succesfully Added the item to cart","cartLineItem": result})
      }).catch(function(err){
        res.send({"msg": "UnSuccesfully Added the item to cart","cartLineItem": err})
        console.log(err);  
      })
    }
    else{
      userFound.cartItems.push({"product": cartLineItem.product, "quantity": cartLineItem.quantity});
      let userUpdateAttributes = {...userFound };
      delete userUpdateAttributes._id;
      User.findOneAndUpdate({ "_id": userId}, {cartItems: userFound.cartItems }).then((result)=>{
        res.send({"msg": "Succesfully Added the item to cart","cartLineItem": result})
      }).catch(function(err){
        res.send({"msg": "UnSuccesfully Added the item to cart","cartLineItem": err})
        console.log(err);  
      })
    }
  }).catch((err)=>{
    res.send({"err": err,"msg": "User doesnot exist"});
  })
})



module.exports = {
  UsersController: UsersController    
}