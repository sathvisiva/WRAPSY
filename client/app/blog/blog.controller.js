'use strict';




angular.module('wrapsy')
.controller('AddBlogCtrl', function($scope, $timeout, Blog, $location) {

	/*$scope.colleges =  Colleges.query();
	$scope.programs =  Programs.query();
	*/

	$scope.save = function(form) {
		if (form.$valid) {
			Blog.save($scope.post, function(resp) {
				
				$location.path('/listBlog');

			}, function(err) {
				
				$scope.message == err;
			});
		}
	}

});
angular.module('wrapsy')
.controller('BlogListCtrl', function($scope, $timeout, Blog,  $location) {

	$scope.posts =  Blog.query();
	

	$scope.deleteCourse = function(courseid) {
		
		Blog.delete({ id:courseid }, function(resp) {
			
			$scope.posts.splice($scope.posts.indexOf(courseid), 1);
		})
	};

});

angular.module('wrapsy')
.controller('BlogEditCtrl', function($scope, $timeout, Blog,  $location,$stateParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Blog.update($scope.post, function(resp) {
				$location.path('/listBlog');

				
			}, function(err) {
				
			})
		}
	}

	


	$scope.post = Blog.get({ slug: $stateParams.id }, function(resp) {

		
	});

});

angular.module('wrapsy')
.controller('BlogViewCtrl', function($scope, $timeout, Blog,  $location,$stateParams) {


	$scope.post = Blog.get({ slug: $stateParams.id }, function(resp) {

		
		$scope.getComments()
	});

	$scope.blogs =  Blog.query();

	$scope.addComment = function(form){


		$scope.comment.post = $scope.post._id
		Blog.comment({ id: $scope.post._id }, $scope.comment, function(resp) {
			$scope.getComments();
			$scope.comment = '';
		}, function(err) {

		});
	}

	$scope.getComments = function(){
		$scope.comments = Blog.comments({ id: $scope.post._id })
		
	}

});
