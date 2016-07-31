/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('stockTickerApp')

    .service('localService', [localService ]);

    function localService() {
        return {
            updateTickerArray: function(newArray,oldArray){ 
                var length = newArray.length;
                var updateTickers = newArray;
                var oldTickers = oldArray;
                if(oldTickers.length > 0){          
                    for(var i=0; i < length ; i++){
                        for(var j = 0; j < length; j++){
                            if(updateTickers[i].symbol == oldTickers[j].symbol){
                                var different =  updateTickers[i].price - oldTickers[j].price;
                                updateTickers[i]['oldPrice'] = oldTickers[j].price;
                                updateTickers[i]['different'] = different;
                                if(different > 0){
                                    updateTickers[i]['upDown'] = 'Up';
                                }else if(different < 0){
                                    updateTickers[i]['upDown'] = 'Down';    
                                }else{
                                    updateTickers[i]['upDown'] = '-';
                                }                   
                                updateTickers[i]['percentage'] = Math.round((((updateTickers[i].price - oldTickers[i].price) / oldTickers[i].price)) * 1000) / 1000;
                                break;
                            }
                        }                    
                    }    
                    return updateTickers;                   
                }   // first time loading -----------
                else{

                    for(var i=0;i< length;i++){    
                        var different =  updateTickers[i].price - updateTickers[i].oldPrice;                                    
                        updateTickers[i]['different'] = different;
                        if(different > 0){
                            updateTickers[i]['upDown'] = 'Up';
                        }else if(different < 0){
                            updateTickers[i]['upDown'] = 'Down';    
                        }else{
                            updateTickers[i]['upDown'] = '-';
                        }                   
                        updateTickers[i]['percentage'] = Math.round((((updateTickers[i].price - updateTickers[i].oldPrice) / updateTickers[i].oldPrice)) * 1000) / 1000;
                    }  
                    return updateTickers;
                }   
            },
            tickerArraySorting: function(data){
                var length = data.length; 
                var tickerArray  = data;          
                if(tickerArray.length > 1){
                    var index = 0;  
                    while(index != (tickerArray.length - 1)){
                        var tempTickerOne = tickerArray[index];
                        var tempTickerTwo =  tickerArray[(index + 1)];                     
                        if(tempTickerOne.different < tempTickerTwo.different){                      
                            tickerArray[index] = tempTickerTwo;
                            tickerArray[(index + 1)] = tempTickerOne;                      
                            if(index == 0){
                                index = index + 1;
                            }else{
                                index = index -1;
                            }
                        }else{
                            index = index + 1;          
                        }                   
                    }       
                    return tickerArray;
                }else{
                    return tickerArray;
                }
            }
        };
    }
})();