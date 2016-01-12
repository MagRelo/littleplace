'use strict';

angular.module('littleplaceApp')
  .controller('HomeCtrl', function ($scope, reviewService) {
    $scope.feed = [
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'McDonalds'},
      {type: 'addfriend', title: 'New friend added', data: 'Rick Ross'},
      {type: 'review', title: 'New review', data: 'Taco Bell'},
    ];

    $scope.groups = [
      {slug: 'the-wildcats', name: 'The wildcats', data: '32'},
      {slug: 'the-bloods', name: 'The bloods', data: '132'},
      {slug: 'the-crypts', name: 'The crypts', data: '2'},
      {slug: 'the-party-people', name: 'The party people', data: '28'},
      {slug: 'the-ballers', name: 'The ballers', data: '71'},
    ];

    $scope.submitReview = function (formData) {
      reviewService.save(formData)
        .then(function(response) {
          $scope.response = response;
        });
    }

  });
