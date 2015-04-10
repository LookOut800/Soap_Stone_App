'use strict';
angular.module('MainController').controller('ArtObjectController', artObjectController);

artObjectController.$inject = ['ArtObjectFactory', '$scope'];

function artObjectController(ArtObjectFactory, $scope){
  var vm = this;
  vm.artObjects = ArtObjectFactory.artObjects;

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
