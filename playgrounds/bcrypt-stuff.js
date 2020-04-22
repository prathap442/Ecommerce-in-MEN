const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = "papad";
var hashedPwd = '';

//To hash
bcrypt.genSalt(10).then(function(salt){
    console.log(salt)
    bcrypt.hash(myPlaintextPassword, salt).then(function(encryptedPassword){
        console.log(encryptedPassword)
    })
}) 
/*
  $2a$10$QYH2kV2SaIwheXyFi05z/e
  $2a$10$QYH2kV2SaIwheXyFi05z/eybYUG3Qp45Vv4XoURzCMqotfEkFTvzW
*/

//To compare
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });


