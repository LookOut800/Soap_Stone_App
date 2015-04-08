'use strict';
angular.module('MainController').controller('CooperHewittController', cooperHewittController);

cooperHewittController.$inject = ['CooperHewittFactory', '$scope'];

function cooperHewittController(CooperHewittFactory, $scope){
  var vm = this;
  vm.artObjects = CooperHewittFactory.artObjects;
  $scope.artObject = {
    period:"",
    color:"",
    medium:""
  };

  $scope.search = function(searchParams){
    // debugger;
    console.log(searchParams);
    console.log('lets search');
    CooperHewittFactory.searchObjects(searchParams);
  };
}



// angular.module("MyModule", []).controller('MyCtrl', ['$scope', function ($scope) {
//     $scope.myModel = {name:""};
// }]);
// In your HTML

// <input type="text" ng-model="myModel.name"/>
