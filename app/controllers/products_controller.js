const express = require('express');
const ProductsController = express.Router();
const { Product } = require("../models/product");

//localhost:3000/products
ProductsController.get('/', (req,res)=>{
  Product.find().then(function(products){
    res.send({
      msg: "Getting all the products",
      products
    })
  }).catch(function(err){
    res.send(err);
  })
  Product.findById
})

//localhost:3000/products POST
ProductsController.post('/', (req,res)=>{
  let productBody = req.body;
  let productInstance = new Product(productBody);
  productInstance.save().then(function(product){
    res.send({"msg": "Product is successfully Created", product})
  }).catch(function(err){
    res.send(err);
  })
})


//to get shortInfo about a product
//localhost:3000/products/:id/shortInfo
ProductsController.get('/:id/shortInfo',function(req,response){
  let productId = req.params.id;
  Product.findById( productId ).then(function(product){
    //populate is the method that is used to fill the data where there are foreign key references .
    product.populate('category',function(err){
       if(err){
        throw err 
       }
       else{
         response.send(product.shortInfo()); 
       }
    })
  }).catch(function(err){
    console.log(err);
    response.send(err);  
  })  
})

//localhost:3000/products/shortInfo
ProductsController.get('/shortInfo',function(req,response){
  Product.find( ).then(function(products){
    response.send(products.map((product) => { return product.shortInfo() } )); 
  }).catch(function(err){
    console.log(err);
    response.send(err);  
  })  
})
    

//localhost:3000/products/:id GET
ProductsController.get('/:id',(req,res)=>{
  let productId = req.params.id;
  Product.findById(productId).then(function(product){
    res.send(product); 
  })
  .catch(function(err){
    res.send(err);  
  })
})

//localhost:3000/products/:id PATCH
/*

kennels.findByIdAndUpdate(
    { _id: "5db6b26730f133b65dbbe459" },
    { breed: "Great Dane" },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );

*/
ProductsController.put('/:id',(req,res)=>{
  let productId = req.params.id;
  let productBody = req.body;
  Product.findByIdAndUpdate({ _id: productId }, productBody, function(err, result){
    if (err) {
      res.send(err)  
    }
    else{
      res.send(result)
    }   
  })
})


//delete the product from the Products Collection
//localhost:3000/products/:id DELETE
ProductsController.delete('/:id',(req, res)=>{
  let productId = req.params.id;
  Product.findOneAndDelete(productId).then(function(result){
    res.send({"msg": "Product is successfully Deleted", result}) 
  }).catch(function(err){
    res.send(err)  
  })  
})



//The time wasting part 
//that took me time to figure out where the thing went wrong
module.exports = {
  ProductsController
}