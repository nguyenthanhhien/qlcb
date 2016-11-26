var app = angular.module('myApp', ['ngSanitize']);

app.controller('AppCtrl',function($scope,$http){
    var Pointer = "<div class='pointer'><div class='arrow'></div><div class='arrow_border'></div></div>";
        console.log("Hello world");
        $scope.active3 = 'active';
        $scope.pointer3 = Pointer;
    
});