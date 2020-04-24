REFERENCES:
  [DCTACADEMY-SEPT-WEEKEND-PRAJECT](https://github.com/dctacademy/sept-weekend-batch/commit/0cf727fa08b9b3ab19e0c095b676f44a000001bd)

Mongodb notest
> mongod
   - This is used to start the database
> mongo 
   - This is used to connect to the database

First ran the command `$ mongo` and then did the following thing

```
  > use Edureka
  switched to db Edureka
  > show collections
  > 
  // The above command has ran and gave an empty list which means that there are no collections(tables) in the database Edureka
```


#### Gui that can beused for the Mongodb? To visualize the databases and the collections in a single database
 ---> Compass




# dependencies that we use are 

```
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "express": "^4.16.4",
    "jsonwebtoken": "^8.4.0",
    "mongodb": "^3.1.8",
    "mongoose": "^5.3.4",
    "shorthash": "0.0.2",
    "validator": "^10.9.0",
    "daemonize2": "^0.4.2"
  },
```




### Adding Custom Validations fieldwise in mongoose Schema 

```
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productSchema = new schema({
  name: {
    type: String,
    maxLength: 13,
    minLength: 1,
    validate: {
      validator: function(name){
        return name == "prathap" 
      },
      msg: "There is failure in the custom validation"
    }
  }  
})

const Product = mongoose.model('Product',productSchema)

module.exports = {
  Product
}
```

### Added both the instance and the Class MEthods
* The class methods can be added by using 
app/models/category.js
```
categorySchema.statics.findAllProductsForCategory = function(category_id){
  return Product.find({category: category_id})
}
```



* The instance methods can added by using 

app/models/product.js
```
productSchema.methods.shortInfo = function(){
  //this returns the document from the collection
  console.log(this);
  return {
    "_id": this._id,
    "description": this.description,
    "special_price": (this.price*(0.9))   
  } 
}
```


# Importance of Middleware in req,res cycle
 [Next IN Node](https://www.quora.com/How-important-is-next-in-Node-js)


#### Some more Validations
```
productSchema.pre('validate', function(next){
    let product = this
    let code = shorthash.unique(product._id.toString())
    product.code = `DCT-${code}`
    next()
})

// productSchema.pre('validate', function(next){
//     console.log('im called before validation')
//     next()
// })

// productSchema.post('validate', function(){
//     console.log('im called after validation')
// })

// productSchema.pre('save', function(next){
//     console.log('im called before saving')
//     next()
// })

// productSchema.post('save', function(){
//     console.log('im called after saving')
// })

```


### Working on the Commit of the  UserAuthentication
- ✓ Taking ShortHash package for the sake of adding the code field to the product documents. This generation of the unique code will happen in the prevalidate callback .
- ✓ Creating the Custom Method findByCredentials(email, password) which is the static method for the User Model .
- ✓ Use bcryptjs to generate the hash password and then to save in the database.
- ✓ /login uri implementation would be agenda of the commit
