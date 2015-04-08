'use strict';
angular.module('soapStoneApp').factory('CooperHewittFactory', ['$http', '$window', 'CooperHewittUrl', 'CooperApiAccess', function($http, $window, CooperHewittUrl, CooperApiAccess){
  var artObjects = [];
  var urlParams;

  var searchObjects = function(params){
    // var data = JSON.parse($window.localStorage.getItem('ss-user'));
    urlParams = _parseSearch(params);
    return $http.get(CooperHewittUrl+'cooperhewitt.search.objects&access_token='+CooperApiAccess+urlParams+'&page=1&per_page=100').success(function(response){
      // debugger;
      _parseResponse(response);
      console.log(urlParams, response, status);
    }).error(function(status){
      console.log('Youre doing it wrong:',status);
    });
  };

  var _parseSearch = function(params){
    debugger;
    return '&color='+ params.color +'&medium='+params.medium +'&period='+ params.period;
  };

  var _parseResponse = function(responseArray){
    responseArray.objects.forEach(function(object){
      artObjects.push(object);
    });
  };

  var getRandomObject = function(){
    // var data = JSON.parse($window.localStorage.getItem('ss-user'));
    debugger;
    return $http.get(CooperHewittUrl+'cooperhewitt.objects.getRandom&access_token='+CooperApiAccess+'&has_image=YES').success(function(response){
      artObjects.push(response);
      console.log('Random Thing:', response, status);
    }).error(function(status){
      console.log('Youre doing it wrong:', status);
    });
  };

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


// GET SEARCH
// curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=<TOKEN>&query=<QUERY> &accession_number=<ACCESSION_NUMBER> &color=<COLOR> &department_id=<DEPARTMENT_ID> &description=<DESCRIPTION> &on_display=<ON_DISPLAY> &display_date=<DISPLAY_DATE> &exhibition=<EXHIBITION> &exhibition_id=<EXHIBITION_ID> &has_images=<HAS_IMAGES> &justification=<JUSTIFICATION> &location=<LOCATION> &woe_id=<WOE_ID> &medium=<MEDIUM> &medium_id=<MEDIUM_ID> &period=<PERIOD> &period_id=<PERIOD_ID> &person=<PERSON> &person_id=<PERSON_ID> &role=<ROLE> &role_id=<ROLE_ID> &person_role_id=<PERSON_ROLE_ID> &tag=<TAG> &tag_id=<TAG_ID> &title=<TITLE> &type=<TYPE> &type_id=<TYPE_ID> &year_acquired=<YEAR_ACQUIRED> &year_end=<YEAR_END> &year_start=<YEAR_START> &width=<WIDTH> &height=<HEIGHT> &depth=<DEPTH> &longestside=<LONGESTSIDE> &shortestside=<SHORTESTSIDE>'

//GET SEARCH
//curl -X GET 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=6dca68aa58d9a8454ff2fd25ada517aa&medium=Lacquered wood&page=1&per_page=100'