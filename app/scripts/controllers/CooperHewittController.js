'use strict';
angular.module('MainController').controller('CooperHewittController', cooperHewittController);

cooperHewittController.$inject = ['CooperHewittFactory', 'ArtObjectFactory', '$scope'];

function cooperHewittController(CooperHewittFactory, ArtObjectFactory, $scope){
  var vm = this;
  vm.artObjects = CooperHewittFactory.artObjects;
  $scope.artObject = {
    period:'',
    color:'',
    medium:''
  };

  $scope.search = function(searchParams){
    console.log('lets search:', searchParams);
    CooperHewittFactory.searchObjects(searchParams);
  };

  vm.saveItem = function(objectParams){
    console.log('grabbing item:', objectParams);
    debugger;
    ArtObjectFactory.upsertArtObject(objectParams);
  };
}



// angular.module("MyModule", []).controller('MyCtrl', ['$scope', function ($scope) {
//     $scope.myModel = {name:""};
// }]);
// In your HTML

// <input type="text" ng-model="myModel.name"/>
