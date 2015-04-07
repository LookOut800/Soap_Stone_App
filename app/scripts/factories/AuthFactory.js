'use strict';
angular.module('soapStoneApp').factory('AuthFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){

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
    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  };

  /*
  data = {
    id: 1
    username: "..."
    token: .....
  }
  */

  return{
    login:login,
    logout:logout,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage
  };
}]);
