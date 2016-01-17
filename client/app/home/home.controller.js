'use strict';

angular.module('littleplaceApp')
  .controller('HomeCtrl', function ($scope, reviewService, groupService, Modal) {


    // --- Dummy Data
    $scope.userFeed = [
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'McDonalds'},
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'Taco Bell'},
    ];

    $scope.feed = [
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'McDonalds'},
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'Taco Bell'},
    ];

    // --- Dummy Data

    $scope.submitReview = function (formData) {

      reviewService.save(formData)
        .then(function(response) {
          $scope.response = response;
          return reviewService.list()
        })
        .then(function (response) {
          $scope.userFeed = response.data;
        });

    }

    reviewService.list()
      .then(function (response) {
          $scope.userFeed = response.data;
      });

    groupService.list()
      .then(function (response) {
          $scope.groups = response.data;
      });

  });
