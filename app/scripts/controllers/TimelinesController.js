'use strict';
angular.module('MainController').controller('TimelinesController', timelinesController);

timelinesController.$inject = ['TimelinesFactory'];

function timelinesController(TimelinesFactory){
  var vm = this;
  vm.timelines = TimelinesFactory.timelines;

  vm.newTimeline = function(timeline) {
      TimelinesFactory.newTimeline(timeline).then(function() {
          resetForm();
      }, function(response) {
          vm.serverErrors = true;
          vm.serverErrorMsg = handleErrors(response.data);
      });
  };

  vm.cancel = function() {
      resetForm();
  };

  function handleErrors(errObj) {
      var errString = '';
      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });
      return errString;
  }

  function resetForm() {
      TimelinesFactory.setTimeline({title: '', description: ''});
      vm.serverErrors = false;
  }
  resetForm();
}
