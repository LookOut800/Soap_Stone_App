'use strict';
angular.module('soapStoneApp').controller('LoginController', LoginController);

LoginController.$inject = ['AuthFactory','$location'];

function LoginController(AuthFactory, $location) {
  var vm = this;

  vm.login = function(credentials){
    console.log('logger');
    AuthFactory.login(credentials).then(function(response){
      vm.credentials = {};
      $location.path('/');
    });
  };

  vm.newUser = function(user) {
      AuthFactory.newUser(user).then(function(response) {
          // resetForm();
          console.log('user response:', response)
      });
  };
}
