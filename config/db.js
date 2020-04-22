const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/mern-weekend-ecommerce', { useNewUrlParser: true, useUnifiedTopology: true  }).then((res) => {
    console.log('connected to db'); 
}).catch((err) => {
    console.log(err); 
});

module.exports = {
    mongoose
}