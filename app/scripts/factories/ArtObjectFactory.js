'use strict';
angular.module('soapStoneApp').factory('ArtObjectFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var artObjects = [];
  var artObject = {};

  var setArtObject = function(){
    angular.copy(newArtObject, artObject);
  };

  var getArtObejcts = function(){
    var data = JSON.parse($window.localStorage.getItem('ss-user'));
    var config = {
      headers: {
        'AUTHORZATION': 'Token token=' + data.token
      }
    };

  return $http.get(ServerUrl+'/artObjects').success(function(response){
      // debugger;
      angular.copy(response, artObjects);

    }).error(function(data,status,headers,config){
      console.log('Youre doing it wrong:',data,status,headers,config);
    });
  };

  var upsertArtObject = function(artObject){
    var params = {
        artObject: artObject
    };
    debugger;
    if (artObject.id) {
        return $http.put(ServerUrl + '/artObjects/' + artObject.id, params)
          .then(getArtObejcts);
    } else {
        return $http.post(ServerUrl + '/artObjects', params)
          .then(function(response){
              artObjects.push(response.data);
          });
    }
  };

  var deleteArtObject = function(artObject){
    return $http.delete(ServerUrl + '/artObjects' + artObject.id)
      .then(function(response){
        artObjects.splice(_findArtObjectsIndexById(artObject.id), 1);
      });
  };

  var _findArtObjectsIndexById = function(id){
    for (var i = 0; i < artObjects.length; i++) {
      if (artObjects[i].id === id) {
        return i;
      }
    }
  };


  return {
    artObject: artObject,
    artObjects: artObjects,
    setArtObject: setArtObject,
    getArtObejcts: getArtObejcts,
    upsertArtObject: upsertArtObject,
    deleteArtObject: deleteArtObject
  };
}]);
