const express = require('express');
const app = express();
const port = 3000; 
const { mongoose } = require('./config/db'); 
const { router } = require('./config/routes');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/', router)

app.listen(port, function() {
  console.log('listening on port', port); 
})