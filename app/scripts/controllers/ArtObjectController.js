'use strict';
angular.module('MainController').controller('ArtObjectController', artObjectController);

artObjectController.$inject = ['ArtObjectFactory', 'TimelinesFactory', '$scope', '$routeParams'];

function artObjectController(ArtObjectFactory, TimelinesFactory, $scope, $routeParams){
  var vm = this;
  vm.artObjects = ArtObjectFactory.artObjects;
  $scope.timeline_id = $routeParams.timeline_id;
  // $scope.artObjects = ArtObjectFactory.artObjects;
  // $scope.artObject = ArtObjectFactory.artObject;
  $scope.$on('$viewContentLoaded', function(){
    console.log('lets get your art objects');
    ArtObjectFactory.getArtObejcts();
  });

  vm.getArtObejcts = function(){
    console.log('lets get your art objects');
    ArtObjectFactory.getArtObejcts();
  };

  vm.upsertArtObject = function(artObject) {
    ArtObjectFactory.upsertArtObject(artObject).then(function() {
        resetForm();
    }, function(response) {
        vm.serverErrors = true;
        vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.deleteArtObject = function(artObject) {
    ArtObjectFactory.deleteArtObject(artObject);
  }

  vm.cancel = function() {
      resetForm();
  };

  function handleErrors(errObj) {
      var errString = '';

      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });

      return errString;
  }

  function resetForm() {
      ArtObjectFactory.setArtObject({name: '', period: '', medium: '', type: ''});

      vm.serverErrors = false;
  }
}
