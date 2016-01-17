'use strict';

angular.module('littleplaceApp')
  .controller('joinGroupCtrl', function ($scope, groupService, Auth) {

    $scope.parseGroups = function (groups, currentUserId) {
      // body...
    }


    $scope.joinGroup = function (groupDoc) {

      // add current user to group
      groupDoc.members.push($scope.currentUser._id)

      // send update to db
      groupService.joinGroup(groupDoc._id, groupDoc).
        then(function (response) {
          // body...
        })
    }

    $scope.leaveGroup = function (groupDoc) {

      // remove current user to group
      groupDoc.members = groupDoc.members.slice(
        groupDoc.members.indexOf($scope.currentUser._id),
        groupDoc.members.indexOf($scope.currentUser._id) + 1
      )

      // send update to db
      groupService.joinGroup(groupDoc._id, groupDoc).
        then(function (response) {
          // body...
        })
    }


    // Init
    $scope.currentUser = Auth.getCurrentUser() || 0

    groupService.list()
      .then(function (response) {

        $scope.groups = response.data.map(function(group){

            // if user is in group.members, mark as 'isMember'
            group.userIsMember = group.members.indexOf($scope.currentUser._id) > -1

            return group
          });
      })

  });
