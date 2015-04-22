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

if(AuthFactory.isAuthenticated()){
    var data = JSON.parse($window.localStorage.getItem('ss-user'));
    $http.defaults.headers.post.Authorization = 'Token token=' + data.token;
    TimelinesFactory.getTimelines();
  } else {
    $location.path('/login');
  }
  // $locationProvider.html5Mode(true);

  $rootScope.$on('$routeChangeStart',function(event,next){
    if(!AuthFactory.isAuthenticated()){
      $location.path('/login');

    }
  });
});

