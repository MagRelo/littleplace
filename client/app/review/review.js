'use strict';

angular.module('littleplaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('review', {
        url: '/review/:reviewId',
        templateUrl: 'app/review/review.html',
        controller: 'ReviewCtrl'
      });
  });
