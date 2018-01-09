'use strict';

angular.module('wrapsy')
  .config(function($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/category/{slug}',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      })
  });
