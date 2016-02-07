'use strict';

angular.module('littleplaceApp')
  .controller('FriendsCtrl', function ($scope, $http, Auth, friendService, geolocation, reviewService) {

    $scope.follow = function (friend) {

      $scope.rowIsLoading = true

      $scope.currentUser.friends.push(friend)

      friendService.follow($scope.currentUser, friend)
        .then(function(argument) {
          $scope.getUserData()
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
          $scope.getUserData()
        })
    }

    $scope.addReview = function (formData) {

      var reviewObj = {
        placeName: $scope.googlePlace.response.name,
        rating: $scope.googlePlace.response.rating,
        phone: $scope.googlePlace.response.formatted_phone_number,
        address: $scope.googlePlace.response.formatted_address,
        location: {
          type: "Point",
          coordinates: [
            $scope.googlePlace.response.geometry.location.lng(),
            $scope.googlePlace.response.geometry.location.lat()
          ]
        },
        thumbs: formData.thumb,
        comments: formData.comments,
      }

      reviewService.save(reviewObj)
        .then(function(response) {
          console.log('save post response:', response.statusCode);

          $scope.getUserData()
        })
    }

    $scope.reviewFilter = function(activity){
      return activity.foreign_id !== null
    }

    $scope.getUserData = function () {

      $http.get('api/users/me')
        .then(function (userResponse) {
          $scope.currentUser = userResponse.data.user
          $scope.activity = userResponse.data.activity.results.map(function (activity) {
            activity.object = JSON.parse(activity.object)
            return activity
          })

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

    // Initialize -------
    // ------------------

    $scope.autocompleteOptions = {}
    $scope.googlePlace = {}

    // https://snazzymaps.com/style/6475/fdfdfdfdfdfd
    $scope.mapOptions = {
      backgroundColor: '#10ade4',
      styles: [
        {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
        {"featureType":"landscape","elementType":"all","stylers":[{"color":"#DCE3E4"}]},
        {"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"},{"hue":"#485659"}]},
        {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
        {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
        {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
        {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
        {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
        {"featureType":"water","elementType":"all","stylers":[{"color":"#2C5A71"},{"visibility":"on"}]}
      ]
    }

    $scope.getUserData()

    // get user location
    geolocation.getLocation()
      .then(function(data){

        $scope.map = {
          center: { latitude: data.coords.latitude, longitude: data.coords.longitude },
          zoom: 14
        }

        // $scope.autocompleteOptions = {
        //   types: ['establishment'],
        //   location: {latitude: data.coords.latitude, longitude: data.coords.longitude},
        //   radius: 50
        // }

      })




  });
