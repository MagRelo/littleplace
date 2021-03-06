'use strict';

angular.module('littleplaceApp')
  .service('reviewService', function ($http) {
    var apiEndpoint = '/api/reviews';

    return {
      save: function(data){
        return $http.post(apiEndpoint + '/', data)
      },
      list: function(){
        return $http.get(apiEndpoint + '/')
      },
      get: function(reviewId){
        return $http.get(apiEndpoint + '/' + reviewId)
      }
    }


  });
