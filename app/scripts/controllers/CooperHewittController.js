'use strict';
angular.module('MainController').controller('CooperHewittController', cooperHewittController);

cooperHewittController.$inject = ['CooperHewittFactory', '$scope'];

function cooperHewittController(CooperHewittFactory, $scope){
  var vm = this;
  vm.artObjects = CooperHewittFactory.artObjects;

  $scope.search = function(searchParams){
    // debugger;
    console.log(searchParams);
    console.log('lets search')
    CooperHewittFactory.searchObjects(searchParams);
  };
}
