const express = require('express');
const UsersController = express.Router();
const { User } = require('../models/user');
UsersController.get('/',function(req,res){
    User.find().then((users) => {
        res.send(users); 
    }).catch((err) => {
        res.send(err); 
    });
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
    res.send(err);  
  })  
})


module.exports = {
  UsersController: UsersController    
}