'use strict';
angular.module('soapStoneApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/search', {
      templateUrl: 'views/search.html'
    })
    .when('/posts', {
      templateUrl: 'views/posts.html',
      controller: 'PostsController',
      controllerAs: 'postsController'
    })
    .when('/art', {
      templateUrl: 'views/art-object.html',
      controller: 'CooperHewittController',
      controllerAs: 'cooperHewittController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
