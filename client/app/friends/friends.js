'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: 'app/friends/friends.html',
        controller: 'FriendsCtrl',
        authenticate: true
      });
  });
