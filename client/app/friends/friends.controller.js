'use strict';

angular.module('littleplaceApp')
  .controller('FriendsCtrl', function ($scope, $http, Auth, friendService, geolocation, reviewService) {

    $scope.follow = function (friend) {

      $scope.rowIsLoading = true

      $scope.currentUser.friends.push(friend)

      friendService.follow($scope.currentUser, friend)
        .then(function(argument) {
          $scope.getFriendList()
        })
    }

    $scope.unFollow = function (unfollowFriend) {

      $scope.rowIsLoading = true

      $scope.currentUser.friends = $scope.currentUser.friends.reduce(function (friendArray, friend) {

        if(unfollowFriend._id !== friend){
          friendArray.push(friend)
        }

        return friendArray

      }, [])

      friendService.unFollow($scope.currentUser, unfollowFriend)
        .then(function(argument) {
          $scope.getFriendList()
        })
    }

    $scope.getFriendList = function () {

      $http.get('api/users/me')
        .then(function (userResponse) {
          $scope.currentUser = userResponse.data.user
          $scope.activity = userResponse.data.activity.results

          return friendService.friendList(
            userResponse.data.user,
            userResponse.data.following.results,
            userResponse.data.followers.results
          )
        })
        .then(function (friendList) {
          $scope.users = friendList
          $scope.rowIsLoading = false
        })

    }

    $scope.addReview = function (formData) {
      reviewService.save(formData)
        .then(function(response) {
          console.log('save post response:', response.statusCode);
          $scope.getFriendList()
        })
    }

    $scope.reviewFilter = function(activity){
      return activity.foreign_id !== null
    }

    geolocation.getLocation()
      .then(function(data){
        $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};

        $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 14 };
      })

    $scope.getFriendList()

  });
