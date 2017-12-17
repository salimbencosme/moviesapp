
angular.module("moviesModule")
    .service('utilsService', function ($location,$route,Notification,$rootScope,$window) {

        this.loadAPage = function(url){
            $location.path(url);
            $route.reload()
        }

        this.errorMessage = function (message){
            Notification.error({message: message, positionY: 'top', positionX: 'right'});
        };

        this.succesMessage = function (message){
            Notification.success({message: message, positionY: 'top', positionX: 'right'});
        };

        this.logout = function () {
            $rootScope.userlogged = undefined;
            $window.localStorage.clear();
        }

    });