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
  'uiGmapgoogle-maps',
  'geolocation',
  'google.places',
])
  .config(function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAFnV6Bxm7kMxIw8Sad_B1dIAA7CMK2kWU',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  });




