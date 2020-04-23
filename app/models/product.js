const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(name){
        return name == "prathap" 
      },
      msg: "There is failure in the custom validation"
    }
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: Schema.Types.ObjectId
  }
});

const Product = mongoose.model('Product',productSchema)

module.exports = {
  Product: Product
}