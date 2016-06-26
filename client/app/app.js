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
      key: 'AIzaSyByZEWY1mVD4izI-b397wdH_JsBSaK15Xw',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  });




