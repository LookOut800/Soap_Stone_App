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
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'MainController',
  'MainDirective'
]).run(function($rootScope, $http, $window, $location, AuthFactory, PostsFactory, CooperHewittFactory, ArtObjectFactory, TimelinesFactory){
  if(AuthFactory.isAuthenticated()){
    var data = JSON.parse($window.localStorage.getItem('ss-user'));
    // $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  } else {
    $location.path('/login');
  }

  $rootScope.$on('$routeChangeStart',function(event,next){
    if(!AuthFactory.isAuthenticated()){
      $location.path('/login');
    } else {
      // PostsFactory.getPosts();
      // CooperHewittFactory.getRandomObject();
    }
  });
});

