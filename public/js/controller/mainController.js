/**
 * main Controller js 
 */
(function() {
	'use strict';
	angular.module('stockTickerApp')

	.controller('mainController', ['$scope','$state',mainController]);

	function mainController($scope,$state){
            
            $scope.loginStockTickerView =  function(){            	
            	$state.go("app.stock-ticker-view");
            }

            $scope.gotoPublicView = function(){
            	$state.go("app.stock-ticker-public-view");
            }

            $scope.gotoSelectedTickerView = function(){
                $state.go("app.stock-select-ticker-view");
            }
        }

})();