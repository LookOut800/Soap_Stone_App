'use strict';
angular.module('MainDirective').directive('artForm', [function(){
  return {
    restrict: 'E',
    templateUrl: 'views/art-search-form.html',
    controller: 'CooperHewittController',
    controllerAs: 'cooperHewittController',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}]);
