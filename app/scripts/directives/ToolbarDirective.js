'use strict';
angular.module('MainDirective').directive('ssToolbar', [function(){
  return {
    restict: 'E',
    templateUrl: 'views/toolbar.html',
    controller: 'NavbarController',
    controllerAs: 'navbarController',
    bindToController: true,
    scope: {},
    link: function($scope, element, attrs){
      // manipulate the DOM here
    }
  };
}]);
