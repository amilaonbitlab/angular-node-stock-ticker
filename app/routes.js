// app/routes.js

// model create
var Ticker = require('./models/ticker');
var User = require('./models/user');

module.exports = function(app) {



    // -- getTicker Collecitons 
    app.get('/api/getTickers', function(req, res) {
        // use mongoose to get all tickers in the database
        Ticker.find(function(err, tickers) {           
            if (err)
                return res.send(err);
            return res.json(tickers); // return all ticker collections JSON format
        });
    });

    // -- Get Wish List by Email 
    app.get('/api/getWishListByUserEmail', function(req, res) {                    
        var email = req.param('email');            
        User.find({"email" : email },function(err, user) {        
            if(user.length > 0){
                res.json(user[0].wishList);              
            }else{
                res.json([]);
            }            
        }); 
    });

    // -- Add Ticker to Wish List by Email 
    app.post('/api/addWishListByUserEmail', function(req, res) {         
        var newTicker = req.body;
        var email = req.param('email');   
        User.find({"email" : email },function(err, user) {        
            if(user.length > 0){
                console.log(user[0].wishList);
                var newWishList = user[0].wishList;              
                    newWishList[newWishList.length] = newTicker.symbol;
                     var newUser = {
                        email : email,
                        name : 'Amila Sampath',
                        wishList : newWishList
                    }
                    User.update({"email" : email},newUser, {upsert: true},
                        function(err,result){ 
                            res.json(newTicker);
                    });

            }else{
                res.json([]);
            }          
        });     
    });

    // -- Remove Ticker from Wish List by Email 
    app.post('/api/removeWishListByUserEmail', function(req, res) {         
        var deleteTicker = req.body;
        var email = req.param('email');   
        User.find({"email" : email },function(err, user) {        
            if(user.length > 0){
                var newWishList = user[0].wishList;              
                    for(var i = 0; i < newWishList.length; i++){
                        if(newWishList[i] == deleteTicker.symbol){
                            newWishList.splice(i,1);
                            break;
                        }
                    }
                     var newUser = {
                        email : email,
                        name : 'Amila Sampath',
                        wishList : newWishList
                    }
                    User.update({"email" : email},newUser, {upsert: true},
                        function(err,result){ 
                            res.json(deleteTicker);
                    });

            }else{
                res.json([]);
            }          
        });     
    });

    // getTicker Collecitons 
    app.post('/api/getUser', function(req, res) {
        
    });
        
    // get Ticker by Symbol 
    app.get('/api/getTickerBySymbol', function(req, res) {
       
    });
        
    // loading index html 
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); 
    });
};