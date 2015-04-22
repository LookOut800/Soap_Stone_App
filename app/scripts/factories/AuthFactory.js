'use strict';
angular.module('soapStoneApp').factory('AuthFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){

  var user = {};

  var login = function(credentials){
    console.log(credentials);
    return $http.post(ServerUrl + '/login', credentials).success(function(response){
      _storeSession(response);
    });
  };

  var logout = function(){
    console.log();
    return $http.get(ServerUrl + '/logout').success(function(){
      $window.localStorage.removeItem('ss-user');
      $window.localStorage.removeItem('ss-user-timeline');
    });
  };

  var newUser = function(user) {
    var params = {
      user: user
    };
    return $http.post(ServerUrl + '/users', params).success(function(response){
      _storeSession(response);
    });
  };

  var isAuthenticated = function(){
    var data = JSON.parse($window.localStorage.getItem('ss-user'));
    if(data) {
      return !!data.token;
    } else {
      return false;
    }
  };

  var clearStorage = function(){
  };

  var _storeSession = function(data) {
    $window.localStorage.setItem('ss-user', JSON.stringify(data));
    $http.defaults.headers.post.Authorization = 'Token token=' + data.token;
  };

  return{
    user: user,
    login:login,
    logout:logout,
    newUser: newUser,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage
  };
}]);
