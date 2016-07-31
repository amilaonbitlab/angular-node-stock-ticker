/**
 * login Controller js 
 */
(function() {
	'use strict';
	angular.module('stockTickerApp')

	.controller('loginController', ['$scope','$rootScope','loginService',loginController]);

	function loginController($scope,$rootScope,loginService){
            
            $scope.data = {
                username : '',
                password : ''
            }

            // login function 
            $scope.login = function(){
                // loginService.getUser($scope.data).success(function(data){
                    // if(data){
                        localStorage.setItem("email","amila@gmail.com");
                        $scope.$parent.loginStockTickerView();
                        $rootScope.isLogin = true;
                        $scope.isLogin = true;                
                        $scope.userName = "Amila Sampath";                        
                        $rootScope.email = 'amila@gmail.com';    
                    // }else{
                    //     $rootScope.isLogin = false;
                    //     $scope.isLogin = false;                         
                    // }
                                            
                // }).error(function(){
                //     alret('User Name or Password Wong');
                // })
      
            }

            // logout function 
            $scope.logout = function(){
                $scope.$parent.gotoPublicView();
                $rootScope.isLogin = false;
                $scope.isLogin = false;                
                $rootScope.email = '';
            }
        }

})();