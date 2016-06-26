'use strict';

angular.module('littleplaceApp')
  .controller('ReviewCtrl', function ($scope, $stateParams, $window, reviewService) {
    $scope.reviewId = $stateParams.reviewId || 0

    $scope.back = function (argument) {
      $window.history.back()
    }

    reviewService.get($scope.reviewId)
      .then(function (response) {
        $scope.review = response.data

        $scope.map = {
          center: {longitude: $scope.review.location.coordinates[0], latitude: $scope.review.location.coordinates[1]},
          zoom: 17
        }

      })
  });
