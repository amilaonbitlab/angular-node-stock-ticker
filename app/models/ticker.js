
// ticker model js 

var mongoose = require('mongoose');

module.exports = mongoose.model('Ticker', {
    symbol : {type : String, default: ''},
    price : {type : Number},
    oldPrice : {type : Number}
});
