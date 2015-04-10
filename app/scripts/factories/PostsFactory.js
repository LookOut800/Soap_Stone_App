'use strict';
angular.module('soapStoneApp').factory('PostsFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var posts = [];

  var getPosts = function(){
    var data = JSON.parse($window.localStorage.getItem('ss-user'));
    var config = {
      headers: {
        'AUTHORZATION': 'Token token=' + data.token
      }
    };

  return $http.get(ServerUrl+'/posts').success(function(response){
      angular.copy(response, posts);

    }).error(function(data,status,headers,config){
      console.log('Youre doing it wrong:',data,status,headers,config);
    });
  };

  return {
    posts: posts,
    getPosts: getPosts
  };
}]);
