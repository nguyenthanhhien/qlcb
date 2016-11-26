var app = angular.module('myApp', ['ngSanitize']);

app.controller('AppCtrl',function($scope,$http,$window,$location){
    var Pointer = "<div class='pointer'><div class='arrow'></div><div class='arrow_border'></div></div>";
        console.log("Hello world");
        $scope.active2 = 'active';
        $scope.pointer2 = Pointer;
        $http.get('/findflight').then(function(response){
            var Flightlist = response.data;
            console.log(Flightlist);
            $scope.Flight = []
            if (Flightlist.length == 0)
                {
                    confirm('Không tìm thấy chuyến bay thỏa yêu cầu');
                }
            else
                {
                    
                    for (var i = 0; i < Flightlist.length; i++)
                        {
                            $scope.Flight[i] = Flightlist[i];
                            var x = Flightlist[i].Ngay;
                           $scope.Flight[i].Ngay = DateConverter(Flightlist[i].Ngay);
                            $scope.Flight[i].Gio = TimeConverter(x);
                            $scope.Flight[i].Check = i;
                            console.log($scope.Flight[i].Check);
                        }
                }
            
        });
    
        $scope.PERSON = function(){
            console.log($scope.Dangky);
            $window.location.href = '/person';
        }
            
        function DateConverter(UNIX_timestamp){
              var a = new Date(UNIX_timestamp * 1000);
              var year = a.getFullYear();
              var month = a.getMonth() + 1;
              var date = a.getDate();
              var time = date + '/' + month + '/' + year ;
              return time;
        }
        
         function TimeConverter(UNIX_timestamp){
              var a = new Date(UNIX_timestamp * 1000);
              var hour = a.getUTCHours();
              var min = a.getMinutes();
              var sec = a.getSeconds();
              var time = hour + ':' + min + ':' + sec ;
              return time;
        }
  });