'use strict';

angular.module('wrapsy')
.controller('CartCtrl', ['$scope', 'Cart', 'Auth', 'Modal','$rootScope', function($scope, Cart, Auth, Modal, $rootScope) {
	$rootScope.ip

	$scope.items = Cart.query({_id : Auth.getCurrentUser()._id}, function(res){
		$scope.items = res;
		console.log($scope.items);
	});
}]);

