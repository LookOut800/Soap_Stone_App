'use strict';
angular.module('MainDirective').directive('timeline', [function(){
  return {
    restrict: 'E',
    templateUrl: 'views/art-object-list.html',
    controller: 'TimelinesController',
    controllerAs: 'timelinesController',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}]);
