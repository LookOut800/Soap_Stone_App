'use strict';
angular.module('MainDirective').directive('artObject', [function(){
  return {
    restrict: 'E',
    templateUrl: 'views/art-object-list.html',
    controller: 'CooperHewittController',
    controllerAs: 'cooperHewittController',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}]);
