/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('stockTickerApp')

    .service('loginService', ['$http','constants', loginService]);

    function loginService($http,constants) {
        return {
            getUser: function(data){
                return $http.post(constants.SERVER_URL+ '/api/getUser',data);
            }
        };
    }
})();