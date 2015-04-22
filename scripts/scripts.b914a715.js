"use strict";function homeController(){}function LoginController(a,b,c,d){var e=this;e.user=a.user,e.login=function(b){console.log("logger"),a.login(b).then(function(a){e.credentials={},c.path("/")})},e.newUser=function(b){a.newUser(b).then(function(a){c.path("/"),console.log("user response:",a)})}}function postsController(a){var b=this;b.posts=a.posts}function cooperHewittController(a,b,c,d){var e=this;e.artObjects=a.artObjects,d.artObject={query:"",title:"",period:"",color:"",medium:"",type:""},d.clearSearchResults=function(){},d.search=function(b){console.log("lets search:",b),c.path("/object-search"),a.searchObjects(b)},e.saveItem=function(a){console.log("grabbing item:",a),b.upsertArtObject(a)}}function artObjectController(a,b,c,d){function e(a){var b="";return angular.forEach(a,function(a,c){b+=c+": "+a}),b}function f(){a.setArtObject({name:"",period:"",medium:"",type:""}),g.serverErrors=!1}var g=this;g.artObjects=a.artObjects,c.timeline_id=d.timeline_id,c.$on("$viewContentLoaded",function(){console.log("lets get your art objects"),a.getArtObejcts()}),g.getArtObejcts=function(){console.log("lets get your art objects"),a.getArtObejcts()},g.upsertArtObject=function(b){a.upsertArtObject(b).then(function(){f()},function(a){g.serverErrors=!0,g.serverErrorMsg=e(a.data)})},g.deleteArtObject=function(b){a.deleteArtObject(b)},g.cancel=function(){f()}}function timelinesController(a,b,c){var d=this;d.timeline=a.timeline,d.timelines=a.timelines,b.timeline={title:"",description:""},b.getTimelines=function(){console.log("lets get your timelines"),a.getTimelines()};var e=function(){a.setTimeline({title:"",description:""}),d.serverErrors=!1};d.cancel=function(){e()},d.upsertTimeline=function(b){a.upsertTimeline(b).then(function(){e()},function(a){d.serverErrors=!0,d.serverErrorMsg=handleErrors(a.data)})},d.activateTimeline=function(b){a.activateTimeline(b),console.log("Activated:",b)},d.deleteTimeline=function(b){a.deleteTimeline(b)},d.handleErrors=function(a){var b="";return angular.forEach(a,function(a,c){b+=c+": "+a}),b}}angular.module("soapStoneApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngMaterial","ngResource","ngRoute","ngSanitize","ngTouch","MainController","MainDirective"]).run(["$rootScope","$http","$window","$location","AuthFactory","PostsFactory","CooperHewittFactory","ArtObjectFactory","TimelinesFactory",function(a,b,c,d,e,f,g,h,i){if(e.isAuthenticated()){var j=JSON.parse(c.localStorage.getItem("ss-user"));b.defaults.headers.post.Authorization="Token token="+j.token,i.getTimelines()}else d.path("/login");a.$on("$routeChangeStart",function(a,b){e.isAuthenticated()||d.path("/login")})}]),angular.module("soapStoneApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"TimelinesController"}).when("/login",{templateUrl:"views/login.html"}).when("/posts",{templateUrl:"views/posts.html",controller:"PostsController",controllerAs:"postsController"}).when("/object-search",{templateUrl:"views/art-object-list.html",controller:"CooperHewittController",controllerAs:"cooperHewittController"}).when("/timelines/:timelineId",{templateUrl:"views/timeline-show.html",controller:"ArtObjectController",controllerAs:"artObjectController"}).otherwise({redirectTo:"/"})}]),angular.module("soapStoneApp").constant("ServerUrl","http://powerful-everglades-6110.herokuapp.com").constant("CooperHewittUrl","https://api.collection.cooperhewitt.org/rest/?method=").constant("CooperApiAccess","bed285fe62e08707962a655f145ab02b"),angular.module("soapStoneApp").factory("AuthFactory",["$http","$window","ServerUrl",function(a,b,c){var d={},e=function(b){return console.log(b),a.post(c+"/login",b).success(function(a){j(a)})},f=function(){return console.log(),a.get(c+"/logout").success(function(){b.localStorage.removeItem("ss-user"),b.localStorage.removeItem("ss-user-timeline")})},g=function(b){var d={user:b};return a.post(c+"/users",d).success(function(a){j(a)})},h=function(){var a=JSON.parse(b.localStorage.getItem("ss-user"));return a?!!a.token:!1},i=function(){},j=function(c){b.localStorage.setItem("ss-user",JSON.stringify(c)),a.defaults.headers.post.Authorization="Token token="+c.token};return{user:d,login:e,logout:f,newUser:g,isAuthenticated:h,clearStorage:i}}]),angular.module("soapStoneApp").factory("PostsFactory",["$http","$window","ServerUrl",function(a,b,c){var d=[],e=function(){{var e=JSON.parse(b.localStorage.getItem("ss-user"));({headers:{AUTHORZATION:"Token token="+e.token}})}return a.get(c+"/posts").success(function(a){angular.copy(a,d)}).error(function(a,b,c,d){console.log("Youre doing it wrong:",a,b,c,d)})};return{posts:d,getPosts:e}}]),angular.module("soapStoneApp").factory("CooperHewittFactory",["$http","$window","CooperHewittUrl","CooperApiAccess",function(a,b,c,d){var e,f=[],g=function(b,g){return e=h(b),a.get(c+"cooperhewitt.search.objects&access_token="+d+e+"&has_image=YES&page=1&per_page=100").success(function(a){i(a),console.log(e,a,status,f)}).error(function(a){console.log("Youre doing it wrong:",a)})},h=function(a){return"&query="+a.query+"&color="+a.color+"&medium="+a.medium+"&period="+a.period+"&title="+a.title+"&type="+a.type},i=function(a){a.objects.forEach(function(a){f.push(a)})},j=function(){JSON.parse(b.localStorage.getItem("ss-user"));return a.get(c+"cooperhewitt.objects.getRandom&access_token="+d+"&has_image=YES").success(function(a){f.push(a),console.log("Random Thing:",a,status)}).error(function(a){console.log("Youre doing it wrong:",a)})};return{searchObjects:g,getRandomObject:j,artObjects:f}}]),angular.module("soapStoneApp").factory("ArtObjectFactory",["$http","$window","ServerUrl",function(a,b,c){var d=[],e={},f=function(a){angular.copy(a,e)},g=function(){var e=JSON.parse(b.localStorage.getItem("ss-user")),f=JSON.parse(b.localStorage.getItem("ss-user-timeline"));return a.get(c+"/users/"+e.id+"/timelines/"+f+"/art_objects").success(function(a){angular.copy(a,d)}).error(function(a,b){console.log("Youre doing it wrong:",a,b)})},h=function(e){var f=(JSON.parse(b.localStorage.getItem("ss-user")),JSON.parse(b.localStorage.getItem("ss-user-timeline"))),g={art_object:{date:e.date,medium:e.medium,title:e.title,object_type:e.type,object_id:e.id,description:e.description,thumbnail:e.images[0].n.url,feature_image:e.images[0].b.url,timeline_id:f}};return a.post(c+"/art_objects",g).success(function(a){d.push(a),console.log("Successful Post:",a,status)}).error(function(a){console.log("Youre doing it wrong:",a)})},i=function(b){return a["delete"](c+"/art_objects/"+b.id).then(function(a){d.splice(j(b.id),1)})},j=function(a){for(var b=0;b<d.length;b++)if(d[b].id===a)return b};return{artObject:e,artObjects:d,setArtObject:f,getArtObejcts:g,upsertArtObject:h,deleteArtObject:i}}]),angular.module("soapStoneApp").factory("TimelinesFactory",["$http","$window","ServerUrl",function(a,b,c){var d=[],e={},f=JSON.parse(localStorage.getItem("ss-user")),g=function(a){angular.copy(a,e)},h=function(){return a.get(c+"/users/"+f.id+"/timelines").then(function(a){angular.copy(a.data,d)})},i=function(a){b.localStorage.setItem("ss-user-timeline",a.id),angular.copy(a,e)},j=function(b){b.user_id=f.id;var d={timeline:b};return a.post(c+"/timelines",d).then(function(a){console.log("getting timeline after upsert"),h()})},k=function(b){return a["delete"](c+"/timelines/"+b.id).then(function(a){d.splice(l(b.id),1)})},l=function(a){for(var b=0;b<d.length;b++)if(d[b].id===a)return b};return{timeline:e,timelines:d,setTimeline:g,getTimelines:h,activateTimeline:i,upsertTimeline:j,deleteTimeline:k}}]),angular.module("MainController",[]),angular.module("soapStoneApp").controller("HomeController",homeController),homeController.$inject=[],angular.module("soapStoneApp").controller("LoginController",LoginController),LoginController.$inject=["AuthFactory","TimelinesFactory","$location","$scope"],angular.module("MainController",["ngMaterial"]).controller("NavbarController",["AuthFactory","TimelinesFactory","$location","$scope","$timeout","$mdSidenav","$log",function(a,b,c,d,e,f,g){function h(a){return function(){return f(a).toggle().then(function(){g.debug("toggle "+a+" is done")})}}d.toggleLeft=h("left"),d.toggleRight=h("right");var i=this;i.isLoggedin=function(){return a.isAuthenticated()},i.logout=function(){a.logout().then(function(){c.path("/")})}}]).controller("LeftCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})}}]).controller("RightCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("right").close().then(function(){d.debug("close RIGHT is done")})}}]),angular.module("MainController").controller("PostsController",postsController),postsController.$inject=["PostsFactory"],angular.module("MainController").controller("CooperHewittController",cooperHewittController),cooperHewittController.$inject=["CooperHewittFactory","ArtObjectFactory","$location","$scope"],angular.module("MainController").controller("ArtObjectController",artObjectController),artObjectController.$inject=["ArtObjectFactory","TimelinesFactory","$scope","$routeParams"],angular.module("MainController").controller("TimelinesController",timelinesController),timelinesController.$inject=["TimelinesFactory","$scope","$route"],angular.module("MainDirective",[]),angular.module("MainDirective").directive("loginForm",[function(){return{restrict:"E",templateUrl:"views/login-form.html",controller:"LoginController",controllerAs:"loginController",bindToController:!0,scope:{credentials:"="}}}]),angular.module("MainDirective").directive("ssNavbar",[function(){return{restict:"E",templateUrl:"views/navbar.html",controller:"NavbarController",controllerAs:"navbarController",bindToController:!0,scope:{},link:function(a,b,c){}}}]),angular.module("MainDirective").directive("ssToolbar",[function(){return{restict:"E",templateUrl:"views/toolbar.html",controller:"NavbarController",controllerAs:"navbarController",bindToController:!0,scope:{},link:function(a,b,c){}}}]),angular.module("MainDirective").directive("artForm",[function(){return{restrict:"E",templateUrl:"views/art-search-form.html",controller:"CooperHewittController",controllerAs:"cooperHewittController",bindToController:!0,scope:{credentials:"="}}}]),angular.module("MainDirective").directive("artObject",[function(){return{restrict:"E",templateUrl:"views/art-object-list.html",controller:"CooperHewittController",controllerAs:"cooperHewittController",bindToController:!0,scope:{credentials:"="}}}]),angular.module("MainDirective").directive("activeTimelines",[function(){return{restrict:"E",templateUrl:"views/active-timelines.html",controller:"TimelinesController",controllerAs:"timelinesController",bindToController:!0,scope:{credentials:"="}}}]),angular.module("MainDirective").directive("ssTimelines",[function(){return{restrict:"E",templateUrl:"views/timeline.html",controller:"TimelinesController",controllerAs:"timelinesController",bindToController:!0,scope:{credentials:"="}}}]);