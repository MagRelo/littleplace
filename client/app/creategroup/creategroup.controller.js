'use strict';

angular.module('littleplaceApp')
  .controller('CreategroupCtrl', function ($scope, groupService) {

    $scope.createGroup = function (data) {
      groupService.createGroup(data)
        .then(function (response) {
          $scope.response = response;
        })
    }

  });
