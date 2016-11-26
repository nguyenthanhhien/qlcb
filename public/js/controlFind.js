var app = angular.module('myApp', ['ngSanitize','ngMessages','ngMaterial']);

app.controller('AppCtrl',function($scope,$http,$window,$location){
    $scope.active_Motchieu = 'active';
    var Pointer = "<div class='pointer'><div class='arrow'></div><div class='arrow_border'></div></div>";
    
    $scope.Error_Find = '';
    $scope.Loaive = '';
     
    console.log("Hello world");
    $scope.active1 = 'active';
    $scope.pointer1 = Pointer;
    $http.get('/noidi').then(function(response){
        var listNoidi = response.data; 
        console.log(listNoidi[0]._id);
        $scope.list = [];
        for (var i = 0; i < listNoidi.length; i++)
            {
                
                $scope.list[i] = listNoidi[i]._id;
                console.log($scope.list[i]);
            }
        $scope.selected_NoiDi = "";
        $scope.hasChanged = function(){
            $http.get('/noiden/'+$scope.selected_NoiDi.Manoidi).then(function(res){
                
                var listNoiden = res.data;
                $scope.listDS = [];
                
                for (var i = 0; i < listNoiden.length; i++)
                    {
                        $scope.listDS[i] = listNoiden[i]._id;
                        console.log($scope.listDS[i]);
                    }
            });
        };
    });
    
    $scope.StartDate = new Date();
    $scope.minDate = new Date(
      $scope.StartDate.getFullYear()-1,
      $scope.StartDate.getMonth(),
      $scope.StartDate.getDate());

    $scope.EndDate = new Date();
    $scope.minEndDate = new Date(
          $scope.EndDate.getFullYear(),
          $scope.EndDate.getMonth(),
          $scope.EndDate.getDate());

    
        $scope.FIND = function(){
            if (($scope.selected_NoiDi == '') || ($scope.selected_NoiDen == '') || ($scope.Loaive == ''))
            {
                $scope.Error_Find = 'Chưa chọn đầy đủ thông tin tìm kiếm';
            }
            else
                {
                    var x = new Date(Date.UTC($scope.StartDate.getFullYear(),$scope.StartDate.getMonth(),$scope.StartDate.getDate()));
                    var y = x.getTime() / 1000;
                    console.log(y);
                            var Find = {
                                Noidi : $scope.selected_NoiDi,
                                Noiden : $scope.selected_NoiDen,
                                Loaive : $scope.Loaive,
                                Ngaydi : y,
                                Ngayve : $scope.EndDate
                            };
                            $http.post('/flightlist',Find).then(function(response){
                                console.log('post flightlist');
                            });
                            $window.location.href = '/flightlist';

                            $scope.KHUHOI = function(){
                            $scope.active_Khuhoi = 'active';
                            $scope.active_Motchieu = '';
                            };

                            $scope.MOTCHIEU = function(){
                            $scope.active_Khuhoi = '';
                            $scope.active_Motchieu = 'active';

                            };

                };

    
                
        }
    
});
