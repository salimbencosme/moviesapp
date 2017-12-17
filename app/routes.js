angular.module("moviesModule")
.config(function($routeProvider){
        $routeProvider
            .when("/",{
                url:"login.html",
               templateUrl: "./app/components/authentication/view.html",
                controller: "authenticationController"

            })
            .when("/movierent",{
                url:"index.html",
                templateUrl: "./app/components/movie_rent/view.html",
                controller: "movieRentController"

            })
            .when("/managerentals",{
                url:"index.html",
                templateUrl: "./app/components/manage_rentals/view.html",
                controller: "manageRentalsController"

            })
        .otherwise("/");
    })
