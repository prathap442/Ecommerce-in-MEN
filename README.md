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

