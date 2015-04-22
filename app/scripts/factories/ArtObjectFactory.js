'use strict';
angular.module('soapStoneApp').factory('ArtObjectFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var artObjects = [];
  var artObject = {};
  // var setArtObject = function(){
  //   angular.copy(newArtObject, artObject);
  // };

  var getArtObejcts = function(){
    var user = JSON.parse($window.localStorage.getItem('ss-user'));
    var timeline_id = JSON.parse($window.localStorage.getItem('ss-user-timeline'));

  return $http.get(ServerUrl+ '/users/'+ user.id +'/timelines/'+ timeline_id +'/art_objects').success(function(response){
      angular.copy(response, artObjects);

    }).error(function(user,status){
      console.log('Youre doing it wrong:',user,status);
    });
  };

  var upsertArtObject = function(artObject){
    var user = JSON.parse($window.localStorage.getItem('ss-user'));
    var timeline_id = JSON.parse($window.localStorage.getItem('ss-user-timeline'));

    // var timeline_params = {
    //   art_object: {
    //       timeline_id: timeline_id,
    //       thumbnail: artObject.images[0].n.url
    //     }
    // };

    var params = {
        art_object: {
          date: artObject.date,
          medium: artObject.medium,
          title: artObject.title,
          object_type: artObject.type,
          object_id: artObject.id,
          description: artObject.description,
          thumbnail: artObject.images[0].n.url,
          feature_image: artObject.images[0].b.url,
          timeline_id: timeline_id
        }
    };

    // return $http.patch(ServerUrl + '/timelines', timeline_params).success(function(response){
    //   debugger;
    //   console.log('Successful Timeline update:', timeline_params, response, status);
    // }).error(function(status){
    //   console.log('Youre doing it wrong:', status);
    // });

    return $http.post(ServerUrl + '/art_objects', params).success(function(response){
      artObjects.push(response);
      console.log('Successful Post:', response, status);
    }).error(function(status){
      console.log('Youre doing it wrong:', status);
    });
  };

  var deleteArtObject = function(artObject){
    debugger;
    return $http.delete(ServerUrl + '/art_objects/' + artObject.id)
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
    // setArtObject: setArtObject,
    getArtObejcts: getArtObejcts,
    upsertArtObject: upsertArtObject,
    deleteArtObject: deleteArtObject
  };
}]);
