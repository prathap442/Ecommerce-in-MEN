const express = require('express');
const app = express();
const port = 3000; 
const { mongoose } = require('./config/db'); 
const { router } = require('./config/routes');
const bodyParser = require('body-parser');

app.use('/', router)

app.listen(port, function() {
  console.log('listening on port', port); 
})