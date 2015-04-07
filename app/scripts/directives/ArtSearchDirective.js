'use strict';
angular.module('MainDirective').directive('artForm', [function(){
  return {
    restrict: 'E',
    templateUrl: 'views/art-form.html',
    controller: 'CooperHewittController',
    controllerAs: 'cooperHewittController',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}]);
