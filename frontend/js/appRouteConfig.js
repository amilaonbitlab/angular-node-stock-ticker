/**
 * app Route Config js 
 */

(function(){
  "use strict";

  angular.module('stockTickerApp')

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('stock-ticker-view', {
      url: "/",
      templateUrl: "views/stockTickerView.html",
      controller: "stockTickerController"
    });

  // Other wise set state 
  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get("$state");
    $state.go('stock-ticker-view');
  });
  
});

})();