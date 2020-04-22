const express = require('express');
const app = express();
const port = 3000; 
const { mongoose } = require('./config/db'); 
//const { routes } = require('./config/routes'); 

app.get('/',(req,res)=>{
  res.send({"firstname": "prathap"})  
})


app.listen(port, function() {
  console.log('listening on port', port); 
})