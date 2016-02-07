'use strict';

angular.module('littleplaceApp')
  .service('groupService', function ($http, Auth) {

    return {
      createGroup: function (data) {
        return $http.post('api/groups/', data)
      },

      joinGroup: function (groupId, groupDoc) {
        return $http.put('api/groups/join/' + groupId, groupDoc)
      },


      leaveGroup: function (groupId, groupDoc) {
        return $http.put('api/groups/leave/' + groupId, groupDoc)
      },

      myGroups: function (userId) {
        return $http.get('api/groups/user/' + userId)
      },

      list: function (userId) {
        return $http.get('api/groups/')
          .then(function (response) {
            var groups = response.data.map(function(group){
                // if user is in group.members, mark group as 'userIsMember'
                group.userIsMember = !!(~group.members.indexOf(userId))
                return group
            })

            return groups
          })
        }
      }
  });
