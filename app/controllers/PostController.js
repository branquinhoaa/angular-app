(function(){
	'use strict'

	angular
	.module('blog-app')
	.controller('PostController', PostController);

	function PostController(UserFactory, $state, $stateParams, $scope){
		$scope.allPosts = showAll();
		$scope.AddComment= AddComment;
		$scope.computeVote= computeVote;
		$scope.homePage = homePage;

		//------------- functions -----------------
		function homePage(){
			debugger;
			var id = $stateParams.id;
			$state.go('userHomePage', {id: id});
		}

		function showAll(){
			var id = $stateParams.id
			return UserFactory.getAllUsersPosts();
		}

		function AddComment(user_id, post_id, comment, $index){
			var newComment = {name: comment.name, comment: comment.comment};
			UserFactory.addComment(user_id, post_id, newComment);

			//why????
			comment.name = '';
			comment.comment = '';
		}

		function computeVote(user_id,post_id, rating, $index){
			UserFactory.computeVote(user_id,post_id, rating);
		}
	}
})();
