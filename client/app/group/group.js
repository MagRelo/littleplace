'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      // .state('group', {
      //   url: '/group/:groupName',
      //   templateUrl: 'app/group/group.html',
      //   controller: 'GroupCtrl',
      //   authenticate: true
      // })
      .state('joingroup', {
        url: '/joingroup',
        templateUrl: 'app/group/joingroup.html',
        controller: 'joinGroupCtrl',
        authenticate: true
      })
      .state('creategroup', {
        url: '/creategroup',
        templateUrl: 'app/group/creategroup.html',
        controller: 'createGroupCtrl',
        authenticate: true
      })
      .state('groups', {
        url: '/groups',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl',
        authenticate: true
      })

      ;
  });
