/**
 * constants Serive js 
 */
(function() {
	 "use strict";
    angular.module('stockTickerApp').constant('constants', {
        SERVER_URL: 'http://localhost:8080',
        TIME_INTERVEL : 10,
        REPEAT_TIMES : 5,
        WAIT_TIME : 5,
    })
})();