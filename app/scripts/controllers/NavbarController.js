angular
  .module('MainController', ['ngMaterial'])
  .controller('NavbarController', function (AuthFactory, $location, $scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    var vm = this;
    vm.isLoggedin = function(){
      debugger;
      return AuthFactory.isAuthenticated();
    };

    vm.logout = function(){
      debugger;
      AuthFactory.logout().then(function(){
        $location.path('/');
      });
    };

    function buildToggler(navID) {
      return function() {
        return $mdSidenav(navID).toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });

// 'use strict';
// angular.module('MainController').controller('NavbarController', navbarController);

// navbarController.$inject = ['AuthFactory', '$location', '$scope', '$timeout', '$mdSidenav', '$log'];

// function navbarController(AuthFactory, $location, $scope, $timeout, $mdSidenav, $log) {
//   var vm = this;
//   // $scope.toggleLeft = buildToggler('left');
//   // $scope.toggleRight = buildToggler('right');

//   $scope.buildToggler = function(navID) {
//     return function() {
//       return $mdSidenav(navID).toggle()
//         .then(function () {
//           $log.debug("toggle " + navID + " is done");
//         });
//     }
//   }

//   $scope.close = function () {
//     $mdSidenav('left').close()
//       .then(function () {
//         $log.debug("close LEFT is done");
//       });
//   };

//   vm.isLoggedin = function(){
//     return AuthFactory.isAuthenticated();
//   };

//   vm.logout = function(){
//     AuthFactory.logout().then(function(){
//       $location.path('/');
//     });
//   };
// }
