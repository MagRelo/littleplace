'use strict';

angular.module('littleplaceApp', [
  'littleplaceApp.auth',
  'littleplaceApp.admin',
  'littleplaceApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
