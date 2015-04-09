'use strict';
angular.module('soapStoneApp').factory('TimelinesFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var timelines = [];
  var timeline = {};
  var user = JSON.parse(localStorage.getItem('ss-user'));

  var setTimeline = function(newTimeline){
    angular.copy(newTimeline, timeline);
  };

  var getTimelines = function(){
    // debugger;
    return $http.get(ServerUrl + '/users/' + user.id + '/timelines')
      .then(function(response){
        angular.copy(response.data, timelines);
      });
  };

  var activateTimeline = function(){
    debugger;
  };

  var upsertTimeline = function(timeline){
    debugger;
    var params = {
      timeline: timeline
    };

    return $http.post(ServerUrl + '/users/' + user.id + '/timelines', params)
      .then(function(response){
        timelines.push(response.data);
      });
  };

  var deleteTimeline = function(timeline) {
        return $http.delete(ServerUrl + '/users/' + user.id + '/timelines' + timeline.id)
            .then(function(response) {
                timelines.splice(_findTimelineIndexById(timeline.id), 1);
            });
    };

  var _findTimelineIndexById = function(id) {
        for (var i = 0; i < timelines.length; i++) {
            if (timelines[i].id === id) {
                return i;
            }
        }
    };

  return {
    timeline: timeline,
    timelines: timelines,
    setTimeline: setTimeline,
    getTimelines: getTimelines,
    upsertTimeline: upsertTimeline,
    deleteTimeline: deleteTimeline,
  };
}]);

// JSON.parse(localStorage.getItem('cmt-user')).id
// users/user.id/timelines/timeline.id/art_objects
// wdi-bos-06-current-students
