'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('joingroup', {
        url: '/joingroup',
        templateUrl: 'app/joingroup/joingroup.html',
        controller: 'JoingroupCtrl'
      });
  });
