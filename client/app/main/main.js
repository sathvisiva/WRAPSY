'use strict';

angular.module('wrapsy')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/shop',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main',
    params: {
     registryId: null,
     registryTitle : null
   }
 })
  .state('viewBlog', {
    url: '/viewBlog/{id}',
    templateUrl: 'app/blog/viewBlog.html',
    controller : 'BlogViewCtrl'
  });
});
