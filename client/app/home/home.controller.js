'use strict';

angular.module('littleplaceApp')
  .controller('HomeCtrl', function ($scope, Auth) {
    $scope.currentUser = Auth.getCurrentUser()
  });
