(function(){
	'use strict';

	angular
	.module('blog-app')
	.factory('UserFactory', UserFactory)

	function UserFactory(){

		var users = [{
			name: 'amanda', email: "amanda@gmail.com",
			posts: [
				  { title: 'titulo1', text:'texto do post1', comments:[{name: "fulano", comment: "nao gostei"}, {name: "fulaninho", comment:"eu gostei"}], rating:5, evaluations:[5,5,5]},
				  { title: 'titulo2', text:'texto do post2', comments:[{name: "ciclano", comment: "achei pessimo"}], rating:5, evaluations:[5,5,5]}
			  ]
		  }];

		var service = {
			getUser: getUser,
			getUsers: getUsers,
			getUserPosts: getUserPosts,
			registerUser: registerUser,
			getUserId: getUserId,
			saveUserPost: saveUserPost,
			deleteUserPost: deleteUserPost,
			getAllUsersPosts: getAllUsersPosts,
			addComment: addComment,
			computeVote: computeVote
		};

		return service;

		//------ functions ------

		function getUser(index){
			if(index<users.length){
				return users[index];
			} else {
				return null;
			}
		}

		function getUsers(){
			return users;
		}

		function getUserId(usuario){
			var index = null;
			debugger;
			users.forEach(function(user, i){
				if(user.name == usuario.name){
					index=i;
				}
			});
			return index;
		}

		function registerUser(user){
			users.push(user);
		}

		function saveUserPost(userIndex, post){
			//find user and save post inside his map
			var currentUser = getUser(userIndex);
			currentUser.posts = currentUser.posts || [];
			currentUser.posts.push(post);
		}

		function getUserPosts(user){
			return user.posts;
		}

		function deleteUserPost(userIndex, postIndex){
			var currentUser = getUser(userIndex);
			currentUser.posts.splice(postIndex,1);
		}

		function getAllUsersPosts(){
			var allPosts = [];
			users.forEach(function(user,index){
				if(user.posts != undefined){
					user.posts.forEach(function(post,i){
						allPosts.push({owner: user.name, user_id: index, post: post, post_id: i});
					});
				}
			});
			return allPosts;
		}

		function addComment(user_id, post_id, comment){
			var user = users[user_id];
			var post = user.posts[post_id];
			var postComments = post["comments"] || [];
			postComments.push(comment);
		}

		function computeVote(user_id,post_id, rating){
			var user = users[user_id];
			var post = user.posts[post_id];
			post["evaluations"].push(rating)
			var sum = post["evaluations"].reduce(function(a,b){return a + b;});
			post["rating"] = (sum/post["evaluations"].length).toFixed(1);
		}
	}
})();
