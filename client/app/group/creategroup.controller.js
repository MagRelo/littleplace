'use strict';

angular.module('littleplaceApp')
  .controller('createGroupCtrl', function ($scope, $state, $stateParams, groupService, Auth) {

    $scope.formData = {}

    $scope.createGroup = function (createGroupForm) {

      createGroupForm.members = [$scope.currentUser._id]

      groupService.createGroup(createGroupForm)
        .then(function (response) {
          $state.go('home')
        })

    }

    $scope.currentUser = Auth.getCurrentUser()

  });
