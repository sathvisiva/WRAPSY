'use strict';

angular.module('wrapsy.auth', [
  'wrapsy.constants',
  'wrapsy.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
