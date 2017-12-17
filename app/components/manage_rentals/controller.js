angular.module("moviesModule")
    .controller("manageRentalsController", function ($scope,$window,$timeout,$http,utilsService,$rootScope,manageRentalsService,$q) {

        $rootScope.showTemplate = 1;
        $scope.userLogged = JSON.parse( $window.localStorage.getItem("userlogged"));
        if($scope.userLogged === null){utilsService.loadAPage("/");}
        $rootScope.userNameLogged = $scope.userLogged['fullname'];
        $rootScope.logout= function () {utilsService.loadAPage("/");utilsService.logout();}
        $scope.orderList = [];
        $scope.processedOrderList = [];
        $scope.rowSelected = {};
        $scope.newTotalAmount = 0;
        $scope.showDatails = false;

        $scope.loadAllOrdersInProcess = function () {
            manageRentalsService.getAllOrders().then(function (response) {
                if(response != null){
                    $scope.orderList = response.data;
                }else{
                    utilsService.errorMessage('there are no order records');
                }
            });

        };

        $scope.loadAllOrdersProcessed = function () {
            manageRentalsService.getAllProcessedOrders().then(function (response) {
                if(response != null){
                    $scope.processedOrderList = response.data;
                }else{
                    utilsService.errorMessage('there are no processed order records');
                }
            });

        };

        $scope.loadAllOrdersInProcess();
        $scope.loadAllOrdersProcessed();
       
        $scope.loadDetails = function(row){

            $scope.rowSelected = row;
            $scope.changeDetails(true);
            todayDate = new Date();
            otherDate = new Date( $scope.rowSelected[0].rent.renteddate);
            var timeDiff = Math.abs(todayDate.getTime() - otherDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 

            if(diffDays > 30){
                $scope.rowSelected[0].rent.haspenalty = true;
                $scope.newTotalAmount = Number($scope.rowSelected[0].rent.totalamount) + (Number($scope.rowSelected[0].rent.totalamount) * 0.05);
            }else{
                $scope.newTotalAmount = Number($scope.rowSelected[0].rent.totalamount);
            }

        }


        $scope.cleanDetails = function(){
            $scope.rowSelected = {};
            $scope.newTotalAmount = 0;
            $scope.changeDetails(false);
        }
        $scope.changeDetails = function(value) {
            $scope.showDatails = value;
        };

        $scope.closeOrder = function(){
         manageRentalsService.updateRent({rentid: $scope.rowSelected[0].rent.rentid,totalamount:$scope.newTotalAmount,haspenalty:$scope.rowSelected[0].rent.haspenalty}).then(function (response) {
                if(response!= null){
                    $scope.loadAllOrdersInProcess();
                    $scope.loadAllOrdersProcessed();
                    $scope.cleanDetails();
                    utilsService.succesMessage('Satisfactory record of order completion');
                }else{
                    utilsService.errorMessage('Your order could not be registered');
                }
            });
        }
    });