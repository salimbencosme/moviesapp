angular.module("moviesModule")
    .controller("authenticationController", function ($scope,$window,authenticationService,utilsService,$rootScope,$q,$http,__env,$location,$route) {

        $rootScope.showTemplate = 0;
        if($window.localStorage.getItem("userlogged") != null & $window.localStorage.getItem("userlogged") != undefined){
            var type = JSON.parse($window.localStorage.getItem("userlogged"))['type'];
            if(parseInt(type) === 2){
                $location.path("/movierent");
            }else if(parseInt(type) === 1){
                $location.path("/managerentals");
            }else{
                $location.path("/");
            }
            $route.reload();
            $rootScope.showTemplate = 1;
        }else{
            $rootScope.logout= function () {
                utilsService.loadAPage("/");
                utilsService.logout();
            }
        }

        $scope.authenticate = function(){
           authenticationService.validateUserCredentials($scope.username,$scope.password).then(function (response) {
            if (response != null) {;
                $window.localStorage.setItem("userlogged", JSON.stringify(response.data));
                $scope.redirectToCorrectPage(response.data['type']);
                $rootScope.userNameLogged = response.data['fullname'];
                $rootScope.showTemplate = 1;
            } else {
                utilsService.errorMessage('There is no user with the credentials entered');
                $rootScope.showTemplate = 0;
            }
        });
        }

        $scope.redirectToCorrectPage = function(type){
            if(parseInt(type) === 2){
                utilsService.loadAPage("/movierent");
            }else{
                utilsService.loadAPage("/managerentals");
            }

            
        }
    });