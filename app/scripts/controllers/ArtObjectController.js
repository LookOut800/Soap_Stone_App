'use strict';
angular.module('MainController').controller('ArtObjectController', artObjectController);

artObjectController.$inject = ['ArtObjectFactory'];

function artObjectController(ArtObjectFactory){
  var vm = this;
  vm.artObjects = ArtObjectFactory.artObjects;

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
      ArtObjectFactory.setArtObject({name: '', period: '', medium: ''});

      vm.serverErrors = false;
  }

  resetForm();
}
