'use strict';

angular.module('littleplaceApp')
  .service('activityService', function ($http, Auth) {

    var currentUser = Auth.getCurrentUser()

    return {
      // createGroup: function (data) {
      //   return $http.post('api/groups/', data)
      // },

      // joinGroup: function (groupId, groupDoc) {
      //   return $http.put('api/groups/join/' + groupId, groupDoc)
      // },

      // myGroups: function (userId) {
      //   return $http.get('api/groups/user/' + userId)
      // },

      list: function () {
        return $http.get('api/activity/')
        }
      }
  });
