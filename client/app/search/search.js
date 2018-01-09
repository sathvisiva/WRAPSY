'use strict';

angular.module('wrapsy')
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search?category&term',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        resolve: {
          products: ['Product', '$stateParams', function(Product, $stateParams) {
            return Product.search({
              limit: $stateParams.term,
              id: $stateParams.category
            });
          }]
        }
      });
  });
