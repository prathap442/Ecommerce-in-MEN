const mongoose = require('mongoose');
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

const Product = mongoose.model('Product',productSchema)

module.exports = {
  Product: Product
}