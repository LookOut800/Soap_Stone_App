'use strict';
angular.module('soapStoneApp').factory('ArtObjectFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var artObjects = [];
  var artObject = {};

  // var setArtObject = function(){
  //   angular.copy(newArtObject, artObject);
  // };

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
    debugger;
    var params = {
        art_object: {
          date: artObject.date,
          medium: artObject.medium,
          title: artObject.title,
          object_type: artObject.type,
          object_id: artObject.id,
          description: artObject.description,
          thumbnail: artObject.images[0].n.url,
          feature_image: artObject.images[0].b.url
        }
    };

    return $http.post(ServerUrl + '/art_objects', params).success(function(response){
      artObjects.push(response);
      console.log('Successful Post:', response, status);
    }).error(function(status){
      console.log('Youre doing it wrong:', status);
    });
  };

  // var deleteArtObject = function(artObject){
  //   return $http.delete(ServerUrl + '/artObjects' + artObject.id)
  //     .then(function(response){
  //       artObjects.splice(_findArtObjectsIndexById(artObject.id), 1);
  //     });
  // };

  // var _findArtObjectsIndexById = function(id){
  //   for (var i = 0; i < artObjects.length; i++) {
  //     if (artObjects[i].id === id) {
  //       return i;
  //     }
  //   }
  // };


  return {
    artObject: artObject,
    artObjects: artObjects,
    // setArtObject: setArtObject,
    // getArtObejcts: getArtObejcts,
    upsertArtObject: upsertArtObject,
    // deleteArtObject: deleteArtObject
  };
}]);
