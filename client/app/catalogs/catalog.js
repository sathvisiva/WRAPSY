'use strict';

angular.module('wrapsy')
.config(function ($stateProvider) {
	$stateProvider
	.state('catalog', {
		url: '/catalog',
		templateUrl: 'app/catalogs/catalog.html',
		controller: 'CatalogCtrl'
	});
});
