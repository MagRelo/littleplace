'use strict';

angular.module('littleplaceApp')
  .directive('reviewbutton', function () {
    return {
      restrict: 'EA',
      template: '<button class="btn btn-large btn-success", ng-click="postModal.openModal()">Add a Review!</button>',
      controller: 'postModalController',
      controllerAs: 'postModal',
    };
  });
