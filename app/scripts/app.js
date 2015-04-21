'use strict';

/**
 * @ngdoc overview
 * @name soapStoneApp
 * @description
 * # soapStoneApp
 *
 * Main module of the application.
 */
angular.module('soapStoneApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngMaterial',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'MainController',
  'MainDirective'
]).run(function($rootScope, $http, $window, $location, AuthFactory, PostsFactory, CooperHewittFactory, ArtObjectFactory, TimelinesFactory){

  // $locationProvider.html5Mode(true);

  $rootScope.$on('$routeChangeStart',function(event,next){
    // TimelinesFactory.getTimelines();
    if(!AuthFactory.isAuthenticated()){
      $location.path('/login');
    }
  });
});

