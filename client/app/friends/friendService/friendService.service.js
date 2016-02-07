'use strict';

angular.module('littleplaceApp')
  .factory('friendService', function ($http) {

    function markUsers (me, currentlyFollowing, currentFollowers, userList) {

      var newList = userList.map(function (randomUser) {

        randomUser.isMe = randomUser._id === me._id

        randomUser.isFollowingMe = currentFollowers.some(function (userFollower) {
          return (userFollower.feed_id.indexOf(randomUser._id) > 0)
        })

        randomUser.imFollowing = currentlyFollowing.some(function (userFollower) {
          return (userFollower.target_id.indexOf(randomUser._id) > 0)
        })

        return randomUser
      })
      return newList
    }

    return {
      follow: function (userObj, friendObj) {
        return $http.post('api/users/follow', {user: userObj, friend: friendObj})
      },
      unFollow: function (userObj, friendObj) {
        return $http.post('api/users/unfollow', {user: userObj, friend: friendObj})
      },
      friendList: function(me, following, followers) {
        return $http.get('api/users')
          .then(function(allUsers) {
            return markUsers(me, following, followers, allUsers.data)
          })
      }
    };
  });
