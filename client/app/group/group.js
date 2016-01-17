'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/group/:groupName',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl'
      })
      .state('joingroup', {
        url: '/joingroup',
        templateUrl: 'app/group/joingroup.html',
        controller: 'joinGroupCtrl'
      })
      .state('creategroup', {
        url: '/creategroup',
        templateUrl: 'app/group/creategroup.html',
        controller: 'createGroupCtrl'
      })

      ;
  });
