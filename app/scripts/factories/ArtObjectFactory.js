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
 //     id: 1,
 // period: nil,
 // color: nil,
 // feature_image: nil,
 // thumbnail: nil,
 // medium: nil,
 // title: "first obejct",
 // description: nil,
 // timeline_id: nil,
 // created_at: Wed, 08 Apr 2015 22:03:49 UTC +00:00,
 // updated_at: Wed, 08 Apr 2015 22:03:49 UTC +00:00>
    debugger;
    var params = {
        art_object: {
          // date: artObject.date,
          medium: artObject.medium,
          title: artObject.title,
          description: artObject.description
        }
    };


    return $http.post(ServerUrl + '/art_objects', params)
      .then(function(response){
          // artObjects.push(response.data);
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
