'use strict';

angular.module('littleplaceApp.auth', [
  'littleplaceApp.constants',
  'littleplaceApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
