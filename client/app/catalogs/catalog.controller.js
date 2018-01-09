'use strict';

angular.module('wrapsy')
.controller('CatalogCtrl', ['$scope', '$state', 'Catalog', '$stateParams',
	function($scope, $state, Catalog, $stateParams) {
		Catalog.query(function(categories) {
			$scope.categories = categories;
			$scope.parentCategories = _.filter(categories, function(category) {
				return category.ancestors.length == 1;
			})
			
		});


	}
	])