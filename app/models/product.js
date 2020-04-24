const mongoose = require('mongoose');
const shortHash = require('shorthash');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  code: {
    type: String,
    unique: true,
    required: true  
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

productSchema.methods.shortInfo = function(){
  //this returns the document from the collection
  console.log(this);
  return {
    "_id": this._id,
    "description": this.description,
    "special_price": (this.price*(0.9))   
  } 
}

productSchema.pre('validate',function(next){
  let productObject = this;
  let shortCode = `DCT-${shortHash.unique(productObject._id.toString())}`;
  productObject.code = shortCode;
  next();
})
const Product = mongoose.model('Product',productSchema)

module.exports = {
  Product: Product
}