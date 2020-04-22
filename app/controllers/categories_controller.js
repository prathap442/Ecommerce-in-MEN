const express = require('express');
const CategoriesController = express.Router();
const { Category } = require('../models/category');
CategoriesController.get('/', (req,res)=>{
  console.log(Category.find().then(function(categories){
    res.send(categories)
  }).catch(function(err){
    res.send(err);
  }))
})


CategoriesController.post('/',function(req,res){
  let categoryBody = req.body;
  let category = new Category(categoryBody);
  category.save().then(function(category){
    res.send({"msg": "Successfully Category was created",category: category})
  }).catch(function(err){
    res.send(err);  
  })
})

CategoriesController.get('/:id',function(req,res){
  let categoryId = req.params.id;
  Category.findById(categoryId).then(function(category){
    res.send({category})
  }).catch(function(err){
    res.send(err);
  })
})

CategoriesController.delete('/:id',function(req,res){
  let categoryId = req.params.id;
  Category.findByIdAndDelete(categoryId).then(function(category){
    res.send({msg: "Category has successfully been destroyed",category})
  })
  .catch(function(err){
    res.send(err);
  })
})
module.exports = {
  CategoriesController: CategoriesController
}