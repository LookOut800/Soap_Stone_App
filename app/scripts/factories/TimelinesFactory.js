'use strict';
angular.module('soapStoneApp').factory('TimelinesFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
  var timelines = [];
  var timeline = {};
  var user = JSON.parse(localStorage.getItem('ss-user'));

  var setTimeline = function(newTimeline){
    angular.copy(newTimeline, timeline);
  };

  var getTimelines = function(){
    return $http.get(ServerUrl + '/users/' + user.id + '/timelines')
      .then(function(response){
        angular.copy(response.data, timelines);
      });
  };

  var activateTimeline = function(activeTimeline){
    $window.localStorage.setItem('ss-user-timeline', activeTimeline.id);
    // timeline = activeTimeline;
  };

  var upsertTimeline = function(timeline){
    timeline['user_id'] = user.id;
    var params = {
      timeline: timeline
    };
    return $http.post(ServerUrl + '/timelines', params);
  };

  var deleteTimeline = function(timeline) {
        return $http.delete(ServerUrl + '/users/' + user.id + '/timelines/' + timeline.id)
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
    activateTimeline: activateTimeline,
    upsertTimeline: upsertTimeline,
    deleteTimeline: deleteTimeline,
  };
}]);

// JSON.parse(localStorage.getItem('cmt-user')).id
// users/user.id/timelines/timeline.id/art_objects
// wdi-bos-06-current-students
