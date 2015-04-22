'use strict';
angular.module('soapStoneApp').controller('LoginController', LoginController);

LoginController.$inject = ['AuthFactory','$location', '$scope'];

function LoginController(AuthFactory, $location, $scope) {
  var vm = this;
  vm.user = AuthFactory.user;

  vm.login = function(credentials){
    console.log('logger');
    AuthFactory.login(credentials).then(function(response){
      vm.credentials = {};
      $location.path('/');
    });
  };

  vm.newUser = function(user) {
      AuthFactory.newUser(user).then(function(response) {
        $location.path('/');
        console.log('user response:', response);
      });
  };
}
