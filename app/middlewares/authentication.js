const { User } = require('../models/user');

const AuthenticateUser = function(req,res,next){
  const token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    req.user = user 
    req.token = token
    next()
  }).catch((err) => {
    res.send({
      notice: err
    })
  })
}
  

module.exports = {
  AuthenticateUser: AuthenticateUser
}