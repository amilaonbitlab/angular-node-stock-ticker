/**
 * stock Ticker Controller js 
 */
(function() {
	'use strict';
	angular.module('stockTickerApp')

	.controller('stockTickerController', ['$scope','$timeout','$interval',stockTickerController]);

	function stockTickerController($scope,$timeout,$interval){
		$scope.message = "All reserved stock@ticker.com";

		// $interval(getStockTickerUpdate, 2000);

		function getStockTickerUpdate() {
			console.log('function is working');
			if($scope.arrayIndex == 1){
				$scope.arrayIndex = 0;
				$scope.stockTikcerArray = [
					{symbol : 'KKDKD', price : 55.0},
					{symbol : 'GDNJJ', price : 77.0}
					];
			}else{
				$scope.arrayIndex = 1;
				$scope.stockTikcerArray = [
					{symbol : 'KKDKD', price : 60.0},
					{symbol : 'GDNJJ', price : 66.0}
					];
			}

		}

		$scope.currentTime = 0;
		$interval(showTime, 1000);

		function showTime(){
			
			if($scope.currentTime < 10 && ($scope.currentTime%2 == 0)){
				getStockTickerUpdate();
			}

			if($scope.currentTime == 20){
				$scope.currentTime = 0; 	
			}else{
				$scope.currentTime = $scope.currentTime + 1; 
			}
		}



	};

})();