'use strict';
angular.module('MainDirective').directive('activeTimelines', [function(){
    return {
      restrict: 'E',
      templateUrl: 'views/active-timelines.html',
      controller: 'TimelinesController',
      controllerAs: 'timelinesController',
      bindToController: true,
      scope: {
        credentials: '='
      }
    };
  }]);
