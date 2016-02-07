'use strict';

angular.module('littleplaceApp')
  .controller('ReviewCtrl', function ($scope, $stateParams, reviewService) {
    $scope.reviewId = $stateParams.reviewId || 0

    reviewService.get($scope.reviewId)
      .then(function (response) {
        $scope.review = response.data

        $scope.starsArray = new Array(Number($scope.review.rating))

      })
  });
