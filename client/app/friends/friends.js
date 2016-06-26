'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/friends/friends.html',
        controller: 'FriendsCtrl',
        authenticate: true
      });
  });
