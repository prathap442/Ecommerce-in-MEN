const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validatePackage = require('validator');
const { CartLineItemSchema } = require('../models/cart_line_item');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  cartItems: [ CartLineItemSchema ],
  tokens: [
    {
      token: {
         type: String 
      }
    }
  ]    
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
    console.log("Hey guys there is no such user");
    return Promise.reject('No such User exists')
  })
}

userSchema.methods.generateToken = function(){
  let user = this;
  let userId = user._id.toString();
  let privateKey = "DCTACADEMy";
  let encodedToken = jwt.sign({userId: userId, expiresIn: (Date.now()+10)},privateKey);
  // return encodedToken
  // returning promisified Token
  return Promise.resolve(encodedToken);
}

userSchema.statics.findByToken = function(token){
  let User = this 
  let tokenData 
  try {
      tokenData = jwt.verify(token, 'DCTACADEMy')
  } catch (e) {
      return Promise.reject(e)
  }
  //token data would be some thing of this format
  //{userId: 1,expiresIn: 2343322}
  return User.findOne({
      '_id': tokenData.userId,
      'tokens.token': token
  })

}

const User = mongoose.model('User', userSchema);
module.exports = {
  User: User  
}
