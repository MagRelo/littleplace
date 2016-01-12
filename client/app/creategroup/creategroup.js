'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creategroup', {
        url: '/creategroup',
        templateUrl: 'app/creategroup/creategroup.html',
        controller: 'CreategroupCtrl'
      });
  });
