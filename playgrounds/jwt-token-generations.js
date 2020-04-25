const jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'secret1234');
console.log(token);
