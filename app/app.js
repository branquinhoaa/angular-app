(function(){
'use scrict';

  angular
    .module("blog-app",['ui.router', 'angular-input-stars'])
    .config(config);

  function config($stateProvider, $urlRouterProvider){
  	$urlRouterProvider.otherwise('/login');

  	$stateProvider
  	  .state('login', {
  	  	url:'/login',
  	  	templateUrl: 'app/templates/user_sign_in.html',
  	  	controller: 'UserController'
  	  })
  	  .state('userHomePage', {
  	  	url: '/user/:id',
  	  	templateUrl: 'app/templates/user_home.html',
  	  	controller: 'UserController'
  	  })
  	  .state('newUserRegistration', {
  	  	url: '/sign_up',
  	  	templateUrl: 'app/templates/user_sign_up.html',
  	  	controller: 'UserController'
  	  })
      .state('posts', {
  	  	url: '/posts/:id',
  	  	templateUrl: 'app/templates/all_posts.html',
  	  	controller: 'PostController'
  	  })
  }
})();
