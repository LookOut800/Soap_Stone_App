angular
  .module('MainController', ['ngMaterial'])
  .controller('NavbarController', function (AuthFactory, TimelinesFactory, $location, $scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    var vm = this;
    vm.isLoggedin = function(){
      return AuthFactory.isAuthenticated();
    };

    vm.logout = function(){
      AuthFactory.logout().then(function(){
        // TimelinesFactory.timelines = [];
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
