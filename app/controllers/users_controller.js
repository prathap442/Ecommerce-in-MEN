const express = require('express');
const UsersController = express.Router();
const { User } = require('../models/user');
const { CartLineItem } = require('../models/cart_line_item');
const bcrypt = require('bcryptjs');
const { AuthenticateUser } = require('../middlewares/authentication');

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
    user.generateToken().then(function(generatedToken){
      console.log(generatedToken);
      user.tokens.push({ token: generatedToken })
      user.save()
        .then(function(user){
          response.setHeader('x-auth',generatedToken)
          response.send({"msg": "generated the token and successfully updated the user record",tokens: user.tokens})
        })
        .catch(function(err){
          response.send({"msg": "Generated the token but not updated the user record"})
        })
    })
  }).catch(function(err){
    response.send(err);
  })
})

//implemeting authentication for seeing /accounts
UsersController.post('/accounts', AuthenticateUser ,function(req,response){
  const user = req.user;
  User.find().then(function(users){
    response.send(users)
  }).catch(function(err){
    response.send({"err": err,"msg": "Unable to get accounts 401"})
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

// PUT users/cart_line_items
/*
{
  productId: "212121212121",

}
*/
UsersController.put('/cart_line_items', AuthenticateUser, function(req,res){
  let userId = req.user._id;
  User.findById(userId).then((userFound)=>{
    let userFoundCartItems= userFound.cartItems;
    let inCartItem = userFoundCartItems.find(function(cartItem){
      return String(cartItem.product) == String(req.body.product_id)
    });
    console.log(inCartItem);
    if(inCartItem){
      inCartItem.quantity = inCartItem.quantity + req.body.quantity
      res.send({"msg": "Update LineItem quantity in cart",userFound })
    }
    else{
      let cartLineItem = new CartLineItem();
      cartLineItem.product = req.body.product_id;
      cartLineItem.quantity = req.body.quantity;
      userFound.cartItems.push(cartLineItem); 
    }
    userFound.save().then(function(updatedUser){
      res.send({
        "msg": "successfully added a new product to the cart",
        "user": updatedUser
      })
    }).catch(function(err){
      res.send({
        "msg": "could not add the new product to the cartLineItem Array by updating the user"
      })
    })
  }).catch((err)=>{
    console.log(err);
    console.log("User does not exist");
    res.send({"err": err,"msg": "User doesnot exist"});
  })
})


//DELETE users/:id/cart_line_items
UsersController.delete('/cart_line_items', AuthenticateUser, function(req,res){
  let userId = req.user._id;
  let productId = req.params.productId;
  let cartItemsFiltered;
  User.findOne(userId).then(function(user){
    cartItemsFiltered = user.cartItems.filter(function(cartItem){
      return (cartItem._id != productId)
    })
    user.cartItems = cartItemsFiltered
    user.save().then(function(updatedUser){
      res.send({"msg": "Found the USer",
                "cartItems": updatedUser.cartItems.product_id
      })
    }).catch(function(err){
      console.log(err);
      res.send(err); 
    })
  }).catch(err => res.send(err));
})

module.exports = {
  UsersController: UsersController    
}