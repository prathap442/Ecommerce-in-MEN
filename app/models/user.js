const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validatePackage = require('validator');
const { CartLineItemSchema } = require('../models/cart_line_item');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
  username: {
    type: String,
    minLength: 1,
    maxLength: 12,
    required: true
  },
  password: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    validate: {
      message: function(){
        //this is the custom validation being done to show that the validation is wron
        console.log("the email is invalid");
      },
      validator: function(value){
        validatePackage.isEmail(value);
      } 
    }
  },
  cartItems: [ CartLineItemSchema ]    
});

userSchema.pre('save', function(next){
  let user = this
  bcrypt.genSalt(10).then(function(salt){
    bcrypt.hash(user.password, salt).then(function(encrypted){
      user.password = encrypted 
      next()
    })
  })
})

userSchema.statics.findByCredentials = function(email,password){
  let userEmail = email;
  let userGivenPassword = password;
  return User.findOne({email: userEmail}).then(function(user){
    return new Promise(function(resolve,reject){
      bcrypt.compare(userGivenPassword, user.password, function(err, result) {
        // result == true
        if(result){
          resolve(user)
        }
        else{
          console.log("in the else block");
          reject('invalid password');
        }
      })  
    })
  }).catch(function(err){  
    return Promise.reject('No such User exists')
  })
}

const User = mongoose.model('User', userSchema);
module.exports = {
  User: User  
}
