'use strict';

angular.module('wrapsy.admin')
.config(function($stateProvider) {
  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    authenticate: 'admin'
  })
  .state('admin.vendors', {
    url: '/vendors',
    templateUrl: 'app/vendors/vendors.html',
    controller : 'ManageVendorsCtrl'
  })
  .state('admin.newvendor', {
    url: '/newvendors',
    templateUrl: 'app/vendors/newvendors.html',
    controller : 'VendorsAddCtrl'
  })
  .state('admin.editvendor', {
    url: '/editvendor/{id}',
    templateUrl: 'app/vendors/newvendors.html',
    controller : 'VendorsEditCtrl'
  })
  .state('admin.filter', {
    url: '/filter',
    templateUrl: 'app/filters/filters.html',
    controller : 'FiltersCtrl'
  })
  .state('admin.feature', {
    url: '/feature',
    templateUrl: 'app/features/features.html',
    controller : 'FeaturesCtrl'
  })
  .state('admin.categories', {
    url: '/catagories',
    templateUrl: 'app/manage-categories/manage-categories.html',
    controller : 'ManageCategoriesCtrl'
  })
  .state('admin.newcategory', {
    url: '/newcatagory',
    templateUrl: 'app/manage-categories/manage-categories-add.html',
    controller : 'ManageCategoriesAddCtrl'
  })
  .state('admin.editcategory', {
    url: '/editcategory/{id}',
    templateUrl: 'app/manage-categories/manage-categories-add.html',
    controller : 'ManageCategoriesEditCtrl'
  })
  .state('admin.products', {
    url: '/products',
    templateUrl: 'app/manage-products/manage-products.html',
    controller : 'ManageProductsCtrl'
  })
  .state('admin.newProduct', {
    url: '/newProduct',
    templateUrl: 'app/manage-products/manage-products-add.html',
    controller : 'ManageProductsAddCtrl',
    resolve: {
      categories: ['Catalog', function(Catalog) {
        return Catalog.query();
      }]
    }
  })
  .state('admin.editProduct', {
    url: '/editProduct/{id}',
    templateUrl: 'app/manage-products/manage-products-add.html',
    controller : 'ManageCategoriesEditCtrl'
  })
  .state('admin.managehome', {
    url: '/managehome',
    templateUrl: 'app/manage-home/manage-home.html',
    controller : 'ManageHomeCtrl'
  })
  .state('admin.addhomeImg', {
    url: '/addhomeImg',
    templateUrl: 'app/manage-home/add-home-image.html',
    controller : 'ManageHomePageImgAddCtrl'
  });
});
