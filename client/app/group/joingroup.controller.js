'use strict';

angular.module('littleplaceApp')
  .controller('joinGroupCtrl', function ($scope, groupService, Auth) {

    $scope.joinGroup = function (groupDoc) {

      // add current user to group
      groupDoc.members.push($scope.currentUser._id)

      // send update to db
      groupService.joinGroup(groupDoc._id, groupDoc).
        then(function (response) {
          return groupService.list($scope.currentUser._id)
        })
        .then(function (response) {
          $scope.groups = response
        })
    }

    $scope.leaveGroup = function (groupDoc) {

      // remove current user to group
      groupDoc.members.splice(groupDoc.members.indexOf($scope.currentUser._id), 1)

      // send update to db
      groupService.leaveGroup(groupDoc._id, groupDoc)
        .then(function (response) {
          return groupService.list($scope.currentUser._id)
        })
        .then(function (response) {
          $scope.groups = response
        })
    }



    // Init
    $scope.currentUser = Auth.getCurrentUser() || 0

    groupService.list($scope.currentUser._id)
      .then(function (response) {
        $scope.groups = response
      })


  });
