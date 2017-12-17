
angular.module("moviesModule")
    .service('movieRentService', ApiService);

function ApiService($http,$q) {
    this.getAllMovies = function (username,password) {
        var defer = $q.defer();
        var url = __env.apiUrl + "movies/";
        $http.get(url).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    }

    this.getMyOrders = function (userid) {
        var defer = $q.defer();
        var url = __env.apiUrl + "rentmoviesuser/"+userid;
        $http.get(url).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    }

    this.saveRent = function (tempJson) {
        var defer = $q.defer();
        $http.post(__env.apiUrl + 'new_rent/',tempJson).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    };


}
