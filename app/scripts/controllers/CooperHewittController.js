'use strict';
angular.module('MainController').controller('CooperHewittController', cooperHewittController);

cooperHewittController.$inject = ['CooperHewittFactory', 'ArtObjectFactory', '$location', '$scope'];

function cooperHewittController(CooperHewittFactory, ArtObjectFactory, $location, $scope){
  var vm = this;
  vm.artObjects = CooperHewittFactory.artObjects;
  $scope.artObject = {
    query: '',
    title: '',
    period:'',
    color:'',
    medium:'',
    type: ''
  };

  $scope.clearSearchResults = function(){
    // angular.element
  };

  $scope.search = function(searchParams){
    console.log('lets search:', searchParams);
    $location.path('/object-search');
    CooperHewittFactory.searchObjects(searchParams)
  };

  vm.saveItem = function(objectParams){
    console.log('grabbing item:', objectParams);
    ArtObjectFactory.upsertArtObject(objectParams);
  };
}
