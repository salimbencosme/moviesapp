
angular.module("moviesModule")
    .service('authenticationService', ApiService);

function  ApiService($http,$q) {
 
    this.validateUserCredentials = function (username,password) {
        var defer = $q.defer();
        var url = __env.apiUrl + "user/"+username+"/"+password;
        $http.get(url).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    }


}

