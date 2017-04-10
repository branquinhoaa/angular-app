(function(){
	'use strict'

	angular
	  .module('blog-app')
	  .controller('UserController', UserController);

	  function UserController(UserFactory, $state, $stateParams, $scope){
	  	$scope.registerUser = registerUser;
	  	$scope.currentUser = getUser;
	  	$scope.currentUserPosts = getUserPosts;
	  	$scope.users=getUsers;
	  	$scope.savePost = savePost;
			$scope.deletePost = deletePost;
			$scope.logaUser = logaUser;

//-------------functions-------------------
			function getUserPosts(){
				return UserFactory.getUserPosts($scope.currentUser);
			}

			function getUsers(){
				return UserFactory.getUsers();
			}

	  	function getUser(){
	  		if($stateParams.id != null){
					$scope.currentUserId=$stateParams.id
	  			return UserFactory.getUser($stateParams.id);
	  		} else {
	  			return null;
	  		}
	  	}

	  	function logaUser(user){
	  		var id = UserFactory.getUserId(user);
	  		$state.go('userHomePage', {id: id});
	  	}

	  	function registerUser(newUser){
	  		UserFactory.registerUser(newUser);
	  		var id = UserFactory.getUserId(newUser);
	  		$state.go('userHomePage', {id: id});
	  	}

	  	function savePost(post){
				var newPost = {title: post.title, text: post.text};
				var id = $stateParams.id;
	  		UserFactory.saveUserPost(id, newPost);
			  $scope.post.title = '';
				$scope.post.text = '';
	  	}
			function deletePost(postIndex){
				var userIndex = $stateParams.id;
				UserFactory.deleteUserPost(userIndex, postIndex);
			}
		}
})();
