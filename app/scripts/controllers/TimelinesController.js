'use strict';
angular.module('MainController').controller('TimelinesController', timelinesController);

timelinesController.$inject = ['TimelinesFactory', '$scope'];

function timelinesController(TimelinesFactory, $scope){
  var vm = this;
  vm.timeline = TimelinesFactory.timeline;
  vm.timelines = TimelinesFactory.timelines;
  $scope.timeline = {
    title: '',
    description: ''
  };

  $scope.$on('$viewContentLoaded', function(){
    TimelinesFactory.getTimelines();
    console.log('gotTimelines on load');
  });

  $scope.getTimelines = function(){
    debugger;
    console.log('lets get your timelines');
    TimelinesFactory.getTimelines();
  };

  var resetForm = function() {
      TimelinesFactory.setTimeline({title: '', description: ''});
      vm.serverErrors = false;
  };

  vm.cancel = function() {
      resetForm();
  };

  vm.upsertTimeline = function(timeline) {
      TimelinesFactory.upsertTimeline(timeline).then(function() {
          resetForm();
      }, function(response) {
          vm.serverErrors = true;
          vm.serverErrorMsg = handleErrors(response.data);
      });
  };

  vm.activateTimeline = function(timeline){
    TimelinesFactory.activateTimeline(timeline);
    console.log('Activated:', timeline);
  };

  vm.deleteTimeline = function(timeline){
    debugger;
    TimelinesFactory.deleteTimeline(timeline);
  };

  vm.handleErrors = function(errObj) {
      var errString = '';
      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });
      return errString;
  };
}
