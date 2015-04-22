-'use strict';
angular.module('soapStoneApp').factory('CooperHewittFactory', ['$http', '$window', 'CooperHewittUrl', 'CooperApiAccess', function($http, $window, CooperHewittUrl, CooperApiAccess){
  var artObjects = [];
  var artObject = {};
  var urlParams;

  var searchObjects = function(params, $scope){
    // debugger;
    // var data = JSON.parse($window.localStorage.getItem('ss-user'));
    urlParams = _parseSearch(params);
    return $http.get(CooperHewittUrl+'cooperhewitt.search.objects&access_token='+CooperApiAccess+urlParams+'&has_image=YES&page=1&per_page=100').success(function(response){
      _parseResponse(response);
      console.log(urlParams, response, status, artObjects);
    }).error(function(status){
      console.log('Youre doing it wrong:',status);
    });
  };

  var _parseSearch = function(params){
    return '&query=' + params.query + '&color='+ params.color +'&medium='+params.medium +'&period='+ params.period + '&title='+ params.title + '&type=' + params.type;
  };

  var _parseResponse = function(responseArray){
    responseArray.objects.forEach(function(object){
      // console.log(artObjects);
      // debugger;
      artObjects.push(object);

    });
  };

  var getRandomObject = function(){
    // var data = JSON.parse($window.localStorage.getItem('ss-user'));
    return $http.get(CooperHewittUrl+'cooperhewitt.objects.getRandom&access_token='+CooperApiAccess+'&has_image=YES').success(function(response){
      artObjects.push(response);
      console.log('Random Thing:', response, status);
    }).error(function(status){
      console.log('Youre doing it wrong:', status);
    });
  };

  // var getArtObjectById = function(params){
  //   return $http.get(CooperHewittUrl+'cooperhewitt.objects.getInfo&access_token='+CooperApiAccess+).success(function(response){
  //     artObjects.push(response);
  //     console.log('Random Thing:', response, status);
  //   }).error(function(status){
  //     console.log('Youre doing it wrong:', status);
  //   });
  // };
  // var addObjectToRails = function(params){
  //   artObject = {};

  // };

  return{
    searchObjects: searchObjects,
    getRandomObject: getRandomObject,
    artObjects: artObjects
  };
}]);



// GET RANDOM
// curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getRandom&access_token=bed285fe62e08707962a655f145ab02b'

// GET IMAGES
//curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&access_token=6dca68aa58d9a8454ff2fd25ada517aa&object_id=18476575'

//GET SEARCH
//curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=6dca68aa58d9a8454ff2fd25ada517aa&medium=Lacquered wood&page=1&per_page=100'

// GET OBJECT
// curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=<TOKEN>&object_id=<OBJECT_ID> &id=<ID> &accession_number=<ACCESSION_NUMBER> &extras=<EXTRAS>'

// GET SEARCH
// curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=<TOKEN>&query=<QUERY> &accession_number=<ACCESSION_NUMBER> &color=<COLOR> &department_id=<DEPARTMENT_ID> &description=<DESCRIPTION> &on_display=<ON_DISPLAY> &display_date=<DISPLAY_DATE> &exhibition=<EXHIBITION> &exhibition_id=<EXHIBITION_ID> &has_images=<HAS_IMAGES> &justification=<JUSTIFICATION> &location=<LOCATION> &woe_id=<WOE_ID> &medium=<MEDIUM> &medium_id=<MEDIUM_ID> &period=<PERIOD> &period_id=<PERIOD_ID> &person=<PERSON> &person_id=<PERSON_ID> &role=<ROLE> &role_id=<ROLE_ID> &person_role_id=<PERSON_ROLE_ID> &tag=<TAG> &tag_id=<TAG_ID> &title=<TITLE> &type=<TYPE> &type_id=<TYPE_ID> &year_acquired=<YEAR_ACQUIRED> &year_end=<YEAR_END> &year_start=<YEAR_START> &width=<WIDTH> &height=<HEIGHT> &depth=<DEPTH> &longestside=<LONGESTSIDE> &shortestside=<SHORTESTSIDE>'

// Headers
// Accept:application/json, text/plain,
// Accept-Encoding:gzip, deflate, sdch
// Accept-Language:en-US,en;q=0.8
// Cache-Control:no-cache
// Connection:keep-alive
// Host:api.collection.cooperhewitt.org
// Origin:http://localhost:9000
// Pragma:no-cache
// Referer:http://localhost:9000/
// User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
// Query String Parametersview sourceview URL encoded
// method:cooperhewitt.search.objects
// access_token:bed285fe62e08707962a655f145ab02b
// color:
// medium:
// period:
// title:Memphis
// type:
// has_image:YES
// page:1
// per_page:100

// Accept:
// Accept-Encoding:gzip, deflate, sdch
// Accept-Language:en-US,en;q=0.8
// Access-Control-Request-Headers:accept, authorization
// Access-Control-Request-Method:GET
// Cache-Control:no-cache
// Connection:keep-alive
// Host:api.collection.cooperhewitt.org
// Origin:http://localhost:9000
// Pragma:no-cache
// Referer:http://localhost:9000/
// User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
