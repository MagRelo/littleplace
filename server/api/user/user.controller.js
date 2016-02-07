'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

import _ from 'lodash';
var stream = require('getstream');
var client = stream.connect('3d9sxz5ev2sh', 'qmjx4f8yhn9ksv9v7g89jeyapygvu5bnt678rf8eqxnvtvt9dk5j4t2m7s3fpsfy', '9030');


// follow user procedure:
// new user is merged into user obj on client, then set to api as update.
// on stream side, follow the user's feed, then add an activity to your feed
export function followUser(req, res) {

  var friend = req.body.friend

  // Connect to Stream feed
  const currentUserFeed = client.feed('user', req.user._id)

  User.findByIdAsync(req.user._id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body.user))
    .then(function (doc) {

      return currentUserFeed.follow('user', friend._id)
    })
    // .then(function (doc) {

    //   const actorString = "User:" + req.user._id
    //   const title = req.user.name + " is now following: " + friend.name + "!"

    //   // Add an activity to the feed
    //   const activity = {
    //     "actor": actorString,
    //     "verb": "follow",
    //     "object": JSON.stringify(friend),
    //     "title": title
    //   }

    //   return currentUserFeed.addActivity(activity)
    // })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// unfollow user procedure:
// new user is sliced from user obj on client, then set to api as update.
// on stream side, unfollow the user's feed, then add an activity to your feed
export function unFollowUser(req, res) {

  var friend = req.body.friend

  // Instantiate a feed using feed class 'user' and user id '1'
  const currentUserFeed = client.feed('user', req.user._id);

  User.findByIdAsync(req.user._id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body.user))
    .then(function (doc) {

      return currentUserFeed.unfollow('user', friend._id)
    })
    // .then(function (doc) {

    //   const actorString = "User:" + req.user._id
    //   const title = req.user.name + " is no longer following: " + friend.name

    //   // Add an activity to the feed
    //   const activity = {
    //     "actor": actorString,
    //     "verb": "unfollow",
    //     "object": JSON.stringify(friend),
    //     "title": title
    //   };

    //   return currentUserFeed.addActivity(activity)
    // })
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  // Connect to Stream feed
  const currentUserFeed = client.feed('user', userId)
  const response = {
    user: null,
    followers: null,
    following: null,
    activity: null
  }

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {return res.status(401).end(); }

      response.user = user
      return currentUserFeed.followers()
    })
    .then(followers => {

      response.followers = followers

      return currentUserFeed.following()
    })
    .then(following => {

      response.following = following
      return currentUserFeed.get()
    })
    .then(activity => {

      response.activity = activity
      res.json(response);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    var friendsArray = updates.friends;
    updated.friends = friendsArray;
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}
