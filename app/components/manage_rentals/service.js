
angular.module("moviesModule")
    .service('manageRentalsService', ApiService);

function ApiService($http,$q) {
    this.getAllOrders = function () {
        var defer = $q.defer();
        var url = __env.apiUrl + "rentmoviesinprocess/";
        $http.get(url).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    }


    this.getAllProcessedOrders = function () {
        var defer = $q.defer();
        var url = __env.apiUrl + "rentmoviesprocessed/";
        $http.get(url).
            then(function (response) {
                defer.resolve(response);
            }, function (error) {
                defer.resolve(null);
            });
        return defer.promise;
    }

    this.updateRent = function (tempJson) {
                var defer = $q.defer();
                $http.put(__env.apiUrl + 'update_rent/',tempJson).
                    then(function (response) {
                        defer.resolve(response);
                    }, function (error) {
                        defer.resolve(null);
                    });
                return defer.promise;
            };
}
