'use strict';
angular.module('MainController').controller('PostsController', postsController);

postsController.$inject = ['PostsFactory'];

function postsController(PostsFactory){
  var vm = this;
  vm.posts = PostsFactory.posts;
}
