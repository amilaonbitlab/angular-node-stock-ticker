/**
 * stock Ticker Controller js 
 */
(function() {
	'use strict';
	angular.module('stockTickerApp')

	.controller('stockTickerController', ['$scope','$rootScope','$timeout','$interval','stockTickerService','localService','constants',stockTickerController]);

	function stockTickerController($scope,$rootScope,$timeout,$interval,stockTickerService,localService,constants){
		
		// ----- Config infomation here --------- 		
		$scope.isVisibleTable = true;
		$scope.isVisibleAll = true;
        $scope.isVisibleWishList = false;        
        $scope.isViewTikcer = false;

        // init arrays 
		$scope.stockTikcerArray  = [];
		$scope.stockTikcerArrayTemp  = [];
		$scope.seletedTikcerArray  = [];
		$scope.tempWishListArry = [];
		$scope.wishList = [];
		if($rootScope.isLogin){
			stockTickerService.getWishListByUserEmail().success(function(data){					
				$scope.wishList = data;
			});
		}		
		$scope.selectTicker = '';		
		// count time start with zero
		$scope.currentTime = 0;
		var Intervel = constants.TIME_INTERVEL;  // default 20 s
		var RepeatTime = constants.REPEAT_TIMES; // default 5
		var Waiting = constants.WAIT_TIME;	     // default 60 s
		
		$interval(showTime, 1000); 			 // function execute every 1000 ms


		// time count function 
		function showTime(){
					
			if(($scope.currentTime%Intervel == 0) && ($scope.currentTime < (Intervel*RepeatTime))){
				if($scope.currentTime != 0)			
					$scope.stockTikcerArrayTemp = $scope.stockTikcerArray;
				getStockTickerUpdate();
			}

			if($scope.currentTime >= (Waiting + (Intervel*RepeatTime))){
				$scope.currentTime = 0;
				$scope.stockTikcerArrayTemp = $scope.stockTikcerArray;
				$scope.stockTikcerArray = [];
				$scope.seletedTikcerArray = [];
			}else{
				$scope.currentTime = $scope.currentTime + 1; 
			}

		}

		// Stock Ticker update function -----------
		function getStockTickerUpdate() {	

			// get stock ticker update from server					
	        stockTickerService.getStockTickers().success(function(data) {

	        	var length = data.length;
	        	var oldTickers = $scope.stockTikcerArrayTemp;        	
	        	var updateTickers = data;

	        	// calulate price changes and %
	        	updateTickers = localService.updateTickerArray(updateTickers,oldTickers);

	        	// Calling Sort method
	        	$scope.stockTikcerArray = localService.tickerArraySorting(updateTickers);

				// Is user login run ------	        	
	        	if($rootScope.isLogin){
	        		// Check ticker in wish list 
	        		for(var i = 0 ; i < $scope.stockTikcerArray.length; i++){
	        			$scope.stockTikcerArray[i].isAddWishList = false;
	        			for(var j = 0 ; j  < $scope.wishList.length ; j++){
	        				if($scope.stockTikcerArray[i].symbol == $scope.wishList[j]){		        					
	        					$scope.stockTikcerArray[i].isAddWishList = true;
	        					break;
	        				}
	        			}	        			
	        		}	

	        		// Filter Wish list Tickers & Added new tempWishList Array	        		
	        		if($scope.wishList.length > 0){	        			
	        			var tempArray = [];
	        			for(var i = 0; i < $scope.stockTikcerArray.length ; i++){
							for(var j = 0; j < $scope.wishList.length; j++){
								if($scope.stockTikcerArray[i].symbol == $scope.wishList[j]){
				        			tempArray[tempArray.length] = $scope.stockTikcerArray[i];
				        			break;
			        			}
			        		}
		        		}		        	
		        		$scope.tempWishListArry = tempArray;	
	        		}
		        			
		        	// Seleted Ticker Information added new array an update		
					if($scope.selectTicker){												
						var seletedTicker = $scope.selectTicker;
		        		var seletedTikcerArray = $scope.seletedTikcerArray;
		        		for(var i = 0; i < $scope.stockTikcerArray.length ; i++){
		        			if($scope.stockTikcerArray[i].symbol == seletedTicker.symbol){
		        				$scope.seletedTikcerArray[seletedTikcerArray.length] = $scope.stockTikcerArray[i];	        				
		        				$scope.selectTicker = $scope.stockTikcerArray[i];
		        			}	        			
		        		}
					}
	        	}
	     
	        	
	        }).error(function(data) {        	
	            alert("Unable get update stock ticker");
	        });

	    } 

        // View All Tickers 
        $scope.viewAllTickers = function(){
        	$scope.isVisibleAll = true;
        	$scope.isVisibleTable = true;
        	$scope.isVisibleWishList = false;        	
        	$scope.selectTicker = '';
        	$scope.seletedTikcerArray = [];
        	$scope.tempWishListArry = [];
        }

        // View Wish List Tickers
        $scope.ViewWishListTickers = function(){
        	// Get update wish list from server 
			stockTickerService.getWishListByUserEmail().success(function(data){		
				console.log(data);
				$scope.wishList = data;
				var tempArray = [];
				for(var i = 0; i < $scope.stockTikcerArray.length ; i++){
					for(var j = 0; j < $scope.wishList.length; j++){
						if($scope.stockTikcerArray[i].symbol == $scope.wishList[j]){
	        				tempArray[tempArray.length] = $scope.stockTikcerArray[i];
	        				break;
	        			}
	        		}
		    	}
		    	$scope.tempWishListArry = tempArray;
			}).error(function(err){
				alert("Unable to show Wish List");
			});
        	$scope.isVisibleWishList = true;
        	$scope.isVisibleTable = true;
        	$scope.isVisibleAll = false;        	
			$scope.selectTicker = '';
			$scope.seletedTikcerArray = [];        	
        }

        // View Seleted Ticker 
        $scope.viewTicker = function(ticker){        	
			$scope.isViewTikcer = true;
			$scope.isVisibleTable = false;
			$scope.tempWishListArry = [];			
        	$scope.selectTicker = ticker;        	
        	for(var i = 0; i < $scope.stockTikcerArray.length ; i++){
        		if($scope.stockTikcerArray[i].symbol == ticker.symbol){
        			$scope.seletedTikcerArray[0] = $scope.stockTikcerArray[i];
        		}
        	}        
        }    

        $scope.addToWishList = function(ticker){
        	console.log(ticker);

        	// user seleted wish list ticker update in DB
        	stockTickerService.addWishListByUserEmail(ticker).success(function(data){        	
        	    $scope.wishList.push(ticker.symbol);
        		for(var i = 0; i < $scope.stockTikcerArray.length ; i++){			
					if($scope.stockTikcerArray[i].symbol == ticker.symbol){
        				$scope.stockTikcerArray[i].isAddWishList = true;
        				break;	        	
	        		}
        		}
        	}).error(function(error){
        		alert('Unable to Add to Wish List');
        	})

				
        }          

        // Remove ticker from wish list in all list view
        $scope.removeTickerFromWishList = function(ticker){

        	stockTickerService.removeWishListByUserEmail(ticker).success(function(data){ 
	        	var index = $scope.wishList.indexOf(ticker.symbol);
	        	if( index > -1){
	        		$scope.wishList.splice(index,1);
					for(var i = 0; i < $scope.stockTikcerArray.length ; i++){			
						if($scope.stockTikcerArray[i].symbol == ticker.symbol){
	        				$scope.stockTikcerArray[i].isAddWishList = false;
	        				break;	        	
		        		}
	        		}
	        	}    
	        }).error(function(error){
        		alert('Unable to Remove Ticker from Wish List');
        	}) 	
        }

        // Remove ticker from wish list in wish list view
        $scope.removeTikcerInWishList = function(ticker){

        	stockTickerService.removeWishListByUserEmail(ticker).success(function(data){ 
	        	var index = $scope.wishList.indexOf(ticker.symbol);        	
	        	if( index > -1){
	        		$scope.wishList.splice(index,1);
					for(var i = 0; i < $scope.tempWishListArry.length ; i++){			
						if($scope.tempWishListArry[i].symbol == ticker.symbol){					
	        				$scope.tempWishListArry.splice(i,1);
	        				break;	        	
		        		}
	        		}
	        		for(var i = 0; i < $scope.stockTikcerArray.length ; i++){			
						if($scope.stockTikcerArray[i].symbol == ticker.symbol){
	        				$scope.stockTikcerArray[i].isAddWishList = false;
	        				break;	        	
		        		}
	        		}
	        	}   
	        }).error(function(error){
        		alert('Unable to Remove Ticker from Wish List');
        	}) 	   	
        }
	};
})();