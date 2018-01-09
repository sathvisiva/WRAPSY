'use strict';

angular.module('wrapsy')
  .config(function($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product/{id}',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl',
        params: {
           registryId: null,
           registryTitle : null
        }
      })
  });
