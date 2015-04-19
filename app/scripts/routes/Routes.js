'use strict';
angular.module('soapStoneApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'TimelinesController'
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/posts', {
      templateUrl: 'views/posts.html',
      controller: 'PostsController',
      controllerAs: 'postsController'
    })
    .when('/object-search', {
      templateUrl: 'views/art-object-list.html',
      controller: 'CooperHewittController',
      controllerAs: 'cooperHewittController'
    })
    .when('/timelines',{
      templateUrl: 'views/timeline.html',
      controller: 'TimelinesController',
      controllerAs: 'timelinesController'
    })
    .when('/timeline-show', {
      templateUrl: 'views/timeline-show.html',
      controller: 'ArtObjectController',
      controllerAs: 'artObjectController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
