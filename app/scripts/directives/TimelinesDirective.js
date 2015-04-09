'use strict';
angular.module('MainDirective').directive('timelineForm', [function(){
    return {
      restrict: 'E',
      templateUrl: 'views/timeline-form.html',
      controller: 'TimelinesController',
      controllerAs: 'timelinesController',
      bindToController: true,
      scope: {
        credentials: '='
      }
    };
  }]);
  // .directive('timelines', [function(){
  //   return {
  //     restrict: 'E',
  //     templateUrl: 'views/timelines',
  //     controller: 'TimelinesController',
  //     controllerAs: 'timelinesController',
  //     bindToController: true,
  //     scope: {
  //       credentials: '='
  //     }
  //   };
  // }]);
