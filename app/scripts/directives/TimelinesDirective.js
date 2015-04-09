'use strict';
angular.module('MainDirective').directive('ssTimelines', [function(){
    return {
      restrict: 'E',
      templateUrl: 'views/timeline.html',
      controller: 'TimelinesController',
      controllerAs: 'timelinesController',
      bindToController: true,
      scope: {
        credentials: '='
      }
    };
  }]);
