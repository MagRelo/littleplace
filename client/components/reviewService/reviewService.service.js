'use strict';

angular.module('littleplaceApp')
  .service('reviewService', function ($http) {
    var apiEndpoint = '/api/reviews';

    return {
      save: function(data){
        return $http.post(apiEndpoint + '/', data)
      }
    }


  });
