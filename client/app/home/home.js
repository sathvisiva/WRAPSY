'use strict';

angular.module('wrapsy')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      });
  });
