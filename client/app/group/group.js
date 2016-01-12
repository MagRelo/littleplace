'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/group/:groupName',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl'
      });
  });
