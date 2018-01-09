'use strict';

angular.module('wrapsy')
  .controller('SidebarAccountCtrl', ['$scope', 'Auth',
    function($scope, Auth) {
      $scope.isAdmin = Auth.hasRole('admin');
      $scope.isLoggedIn = Auth.isLoggedIn();
    }
  ]);
