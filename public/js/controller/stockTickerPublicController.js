/**
 * stock Public Ticker Controller js 
 */
(function() {
	'use strict';
	angular.module('stockTickerApp')

	.controller('stockTickerPublicController', ['$scope','$rootScope','$interval','stockTickerService','localService','constants',stockTickerPublicController]);

	function stockTickerPublicController($scope,$rootScope,$interval,stockTickerService,localService,constants){
		
		// config 
		var intervel = constants.TIME_INTERVEL;
		var repeatTime = constants.REPEAT_TIMES;
		var waiting = constants.WAIT_TIME;		
		$scope.currentTime = 0;
		// init stock tikcer arrys
		$scope.stockTikcerArray  = [];
		$scope.stockTikcerArrayTemp  = [];

		// function execute every 1000 ms
		$interval(countTime, 1000); 	

		// time count function 
		function countTime(){					

			// update condition here 
			if(($scope.currentTime%intervel == 0) && ($scope.currentTime < (intervel*repeatTime))){
				if($scope.currentTime != 0)			
					$scope.stockTikcerArrayTemp = $scope.stockTikcerArray;
				// Call Ticker update function ----------
				getStockTickerUpdate();
			}

			// wait condition here
			if($scope.currentTime >= (waiting + (intervel*repeatTime))){
				$scope.currentTime = 0;
				$scope.stockTikcerArrayTemp = $scope.stockTikcerArray;
				$scope.stockTikcerArray = [];
			} // continue -----
			else{
				$scope.currentTime = $scope.currentTime + 1; 
			}

		}

		// Stock Ticker update function -----------
		function getStockTickerUpdate() {	

			// get stock ticker update from server					
	        stockTickerService.getStockTickers().success(function(data) {

	        	// config ------
	        	var oldTickers = $scope.stockTikcerArrayTemp;        	
	        	var updateTickers = data;

	        	// calulate price changes and %
	        	updateTickers = localService.updateTickerArray(updateTickers,oldTickers);

	        	// Calling Sort method
	        	$scope.stockTikcerArray = localService.tickerArraySorting(updateTickers);
	        	
	        }).error(function(data) {        	
	            alert("Unable get update stock ticker");
	        });

	    }       

	};

})();