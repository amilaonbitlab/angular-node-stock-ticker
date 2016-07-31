// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose 	   = require('mongoose');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port as 8080
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Angular Node Stock Ticker Server Port : ' + port);

// expose app           
exports = module.exports = app;  

// Start DB update 

// grab the Ticker model we just created
var User = require('./app/models/user');

// When restart sever remove all User Collection
User.find({}).remove().exec();

var userOne = new User();
userOne.email = 'amila@gmail.com';
userOne.password =  '123';
userOne.name = 'Amila Sampath';
userOne.wishList = ["MSFT"];

userOne.save();

// Random number mondule 
var rn = require('random-number');

// grab the Ticker model we just created
var Ticker = require('./app/models/ticker');
// Random number mondule 
var rn = require('random-number');

// When restart sever remove all Previes Ticker Collection 
Ticker.find({}).remove().exec();

// inite ticker collections 
var tickerOne = new Ticker();
tickerOne.symbol = "MSFT";
tickerOne.price = Math.round(rn({min:50,max:500}));
tickerOne.oldPrice = Math.round(rn({min:50,max:500}));
tickerOne.save();

var tickerTwo = new Ticker();
tickerTwo.symbol = "INTC";
tickerTwo.price = Math.round(rn({min:50,max:500}));
tickerTwo.oldPrice = Math.round(rn({min:50,max:500}));
tickerTwo.save();

var tickerThree = new Ticker();
tickerThree.symbol = "CAMT";
tickerThree.price = Math.round(rn({min:50,max:500}));
tickerThree.oldPrice = Math.round(rn({min:50,max:500}));
tickerThree.save();

var tickerFour = new Ticker();
tickerFour.symbol = "NOVT";
tickerFour.price = Math.round(rn({min:50,max:500}));
tickerFour.oldPrice = Math.round(rn({min:50,max:500}));
tickerFour.save();

var tickerFive = new Ticker();
tickerFive.symbol = "SMIJ";
tickerFive.price = Math.round(rn({min:50,max:500}));
tickerFive.oldPrice = Math.round(rn({min:50,max:500}));
tickerFive.save();

function gteTicker(name){
   var result = Ticker.find({symbol:name});
   return result;
}

// Every second update ticker price 
setInterval(function () { 

	Ticker.find({}).exec(function(err,tickers){
		tickers.forEach(function(ticker){			
			var newTicker = {
				symbol : ticker.symbol,
				oldPrice : ticker.price,
				price : Math.round(rn({min:50,max:500}))
			};			
			Ticker.update({symbol : ticker.symbol},newTicker, {upsert: true},
	      		function(err,result){
	      			if(err)
	      				return console.log('update err : '+ticker.symbol);
	      			// console.log('updated : '+ticker.symbol);

	      	})
		})
	})

}, 1000); 