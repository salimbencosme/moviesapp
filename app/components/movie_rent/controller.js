angular.module("moviesModule")
    .controller("movieRentController", function ($scope,$window,$timeout,$http,utilsService,$rootScope,movieRentService,$q) {

        $rootScope.showTemplate = 1;
        $scope.userLogged = JSON.parse( $window.localStorage.getItem("userlogged"));
        if($scope.userLogged === null){utilsService.loadAPage("/");}
        $rootScope.userNameLogged = $scope.userLogged['fullname'];
        $rootScope.logout= function () {utilsService.loadAPage("/");utilsService.logout();}
        $scope.movieList = [];
        $scope.myorderList = [];
        $scope.myNewOrderList = [];
        $scope.newTotalAmount = 0;

        $scope.loadAllOrders = function () {
            movieRentService.getMyOrders(Number($scope.userLogged['userid'])).then(function (response) {
                if(response != null){
                    $scope.myorderList = response.data;
                }else{
                    utilsService.errorMessage('there are no order records');
                }
            });

        };

        $scope.loadAllMovies = function () {
            movieRentService.getAllMovies().then(function (response) {
                if(response != null){
                    $scope.movieList = response.data;
                }else{
                    utilsService.errorMessage('there are no movie records');
                }
            });

        };

        $scope.loadAllOrders();
        $scope.loadAllMovies();

        $scope.addMovie = function(movieSelected){

            if($scope.myNewOrderList.length === 0){
                $scope.myNewOrderList.push(movieSelected);
                $scope.newTotalAmount += Number(movieSelected.rentalprice);
            }else{
                var cont = 0;
                for (var i = 0; i < $scope.myNewOrderList.length; i++) {
                    var movie = $scope.myNewOrderList[i];
                    
                    if(movie.movieid === movieSelected.movieid){
                        cont++;
                        break;
                    }
                }

                if(cont === 0 ){
                  $scope.myNewOrderList.push(movieSelected);
                  $scope.newTotalAmount += Number(movieSelected.rentalprice);
                }else{
                    utilsService.errorMessage('The movie is already selected');
                }

            }
        }


        $scope.removeMovie = function(movieSelected){
            for (var i = 0; i < $scope.myNewOrderList.length; i++) {
                var movie = $scope.myNewOrderList[i];
                if(movie.movieid === movieSelected.movieid){
                    $scope.newTotalAmount -= Number(movieSelected.rentalprice);
                    $scope.myNewOrderList.splice(i, 1)
                    break;
                }
            }
        }

        $scope.cleanValues = function(){
            $scope.newTotalAmount = 0;
            $scope.myNewOrderList = [];
        }

        $scope.rent = function(){
            var movieidsTemp = [];
            for (var i = 0; i < $scope.myNewOrderList.length; i++) {
                var movie = $scope.myNewOrderList[i];
                movieidsTemp.push(movie.movieid);
            }
            
           movieRentService.saveRent({totalamount: $scope.newTotalAmount,userid: Number($scope.userLogged['userid']),movieids:movieidsTemp}).then(function (response) {
                if(response!= null){
                    $scope.cleanValues();
                    $scope.loadAllOrders();
                    utilsService.succesMessage('Your order has been successfully completed. You have a period of 30 days to return the movie (s). If you pass the stipulated time, you will pay an additional 5% of the cost of this rent.');
                }else{
                    utilsService.errorMessage('Your order could not be registered');
                }
            });
        }

        

    });