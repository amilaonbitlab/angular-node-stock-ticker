/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('stockTickerApp')

    .service('stockTickerService', ['$http','$rootScope','constants', stockTickerService ]);

    function stockTickerService($http,$rootScope,constants) {
        return {
            getStockTickers: function(){
                return $http.get(constants.SERVER_URL+ '/api/getTickers');
            },
            getSeleteTickerBySymbol: function(data){
                return $http.get(constants.SERVER_URL+ '/api/getTickerBySymbol?symbol='+data);
            },
            getWishListByUserEmail: function(){
                return $http.get(constants.SERVER_URL+ '/api/getWishListByUserEmail?email='+$rootScope.email);
            },
            addWishListByUserEmail: function(data){
                return $http.post(constants.SERVER_URL+ '/api/addWishListByUserEmail?email='+$rootScope.email,data);
            },
            removeWishListByUserEmail: function(data){
                return $http.post(constants.SERVER_URL+ '/api/removeWishListByUserEmail?email='+$rootScope.email,data);
            }
        };
    }
})();