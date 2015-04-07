'use strict';
angular.module('MainController').controller('CooperHewittController', cooperHewittController);

cooperHewittController.$inject = ['CooperHewittFactory', '$scope'];

function cooperHewittController(CooperHewittFactory, $scope){
  var vm = this;
  vm.artObjects = CooperHewittFactory.artObjects;

  $scope.search = function(searchParams){
    debugger;
    console.log(searchParams);
    console.log('lets search')
    CooperHewittFactory.searchObjects(searchParams);
    // CooperHewittFactory.getRandomObject();
  };
}



// <script>
//   angular.module('formExample', [])
//     .controller('ExampleController', ['$scope', function($scope) {
//       $scope.master = {};

//       $scope.update = function(user) {
//         $scope.master = angular.copy(user);
//       };

//       $scope.reset = function() {
//         $scope.user = angular.copy($scope.master);
//       };

//       $scope.reset();
//     }]);
// </script>
