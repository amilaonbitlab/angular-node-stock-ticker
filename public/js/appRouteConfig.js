/**
 * app Route Config js 
 */

(function(){
  "use strict";

  angular.module('stockTickerApp')

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
     .state('app', {
        abstract: true,
        templateUrl: 'views/mainView.html',
        controller: 'mainController'
    })
    .state('app.stock-ticker-public-view', {
        url: '/stock-ticker-public-view',
        templateUrl: 'views/stockTickerPublicView.html',
        controller: 'stockTickerPublicController'    
    })
    .state('app.stock-ticker-view', {
        url: '/stock-ticker-view',
        templateUrl: 'views/stockTickerView.html',
        controller: 'stockTickerController'    
    })
    .state('app.stock-selete-ticker-view', {
        url: '/stock-ticker-selete-view',
        templateUrl: 'views/stockSeleteTickerView.html',
        controller: 'stockTickerController'    
    })
    .state('app.register', {
        url: '/stock-ticker-register-view',
        templateUrl: 'views/stockTickerView.html',
        controller : 'loginController'    
    });

      // // Other wise set state 
  $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get("$state");
      $state.go('app.stock-ticker-public-view');
  });

  
})
// .run(function($rootScope) {

//     if (typeof $rootScope.email === 'undefined'){
//       $rootScope.isLogin = false;  
//       $rootScope.email = '';
//     }
// });


})();