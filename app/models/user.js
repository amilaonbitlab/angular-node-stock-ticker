// user model js 

var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email : {type : String},    
    name : {type : String},
    password : {type : String}, // Later encript 
    wishList : {type : Array}
});
