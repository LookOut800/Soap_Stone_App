'use strict';
angular.module('MainController').controller('TimelinesController', timelinesController);

timelinesController.$inject = ['TimelinesFactory', '$scope'];

function timelinesController(TimelinesFactory, $scope){
  var vm = this;
  vm.timelines = TimelinesFactory.timelines;
  $scope.timeline = {
    title: '',
    description: ''
  };

  $scope.$on('$viewContentLoaded', function(){
    TimelinesFactory.getTimelines();
  });

  $scope.getTimelines = function(){
    console.log('lets get your timelines');
    TimelinesFactory.getTimelines();
  };

  vm.upsertTimeline = function(timeline) {
    debugger;
      TimelinesFactory.upsertTimeline(timeline).then(function() {
          resetForm();
      }, function(response) {
        debugger;
          // vm.serverErrors = true;
          // vm.serverErrorMsg = handleErrors(response.data);
      });
  };

  vm.activateTimeline = function(){
    debugger;
  };

  vm.cancel = function() {
      resetForm();
  };

  vm.handleErrors = function(errObj) {
      var errString = '';
      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });
      return errString;
  }

  vm.resetForm = function() {
      TimelinesFactory.setTimeline({title: '', description: ''});
      vm.serverErrors = false;
  };
}
