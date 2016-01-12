'use strict';

angular.module('littleplaceApp')
  .service('groupService', function ($http) {
    return {
      createGroup: function (data) {
        return $http.post('api/groups/', data)
      }
    }
  });
