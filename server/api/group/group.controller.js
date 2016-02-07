/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/groups              ->  index
 * POST    /api/groups              ->  create
 * GET     /api/groups/:id          ->  show
 * PUT     /api/groups/:id          ->  update
 * DELETE  /api/groups/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Group from './group.model';

var stream = require('getstream');

// Instantiate a new client (server side)
var client = stream.connect('rpyxf5ytwwyh', 'ekwtsebsws5md7fjstncbma9au345t5ht86shgac7emqmsuhj8svcwdkqydwf4xf', '3143');


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    var memberArray = updates.members;
    updated.members = memberArray;
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Groups
export function index(req, res) {
  Group.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Group from the DB
export function show(req, res) {
  Group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Group in the DB
export function create(req, res) {
  Group.createAsync(req.body)
    .then(function (doc) {

      // Instantiate a feed using feed class 'user' and user id '1'
      const groupFeed = client.feed('Group', doc._id);

      const actorString = "user:" + req.user._id
      const groupString = "Group:" + doc._id
      const title = req.user.name + " created group: " + doc.groupName + "!"

      // Add an activity to the feed
      const activity = {
        "actor": actorString,
        "verb": "createGroup",
        "object": doc.groupName,
        "title": title,
        "to": [actorString]
      };

      return groupFeed.addActivity(activity)
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Group in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Group from the DB
export function destroy(req, res) {
  Group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Join a group
export function joinGroup(req, res) {

  Group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function (doc) {

      // Instantiate a feed using feed class 'user' and user id '1'
      const user1 = client.feed('user', req.user._id);

      const title = req.user.name + " joined group: " + doc.groupName + "!"
      const actorString = "User:" + req.user._id
      const groupString = "Group:" + doc._id

      console.log(groupString)

      // Add an activity to the feed
      const activity = {
        "actor": actorString,
        "verb": "joinGroup",
        "object": req.user.name,
        "title": title,
        "to": [groupString]
      };

      return user1.addActivity(activity)
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Join a group
export function leaveGroup(req, res) {

  Group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function (doc) {

      // Instantiate a feed using feed class 'user' and user id '1'
      const user1 = client.feed('user', req.user._id);

      const title = req.user.name + " left group: " + doc.groupName
      const actorString = "User:" + req.user._id
      const groupString = "Group:" + doc._id

      console.log(groupString)


      // Add an activity to the feed
      const activity = {
        "actor": actorString,
        "verb": "leaveGroup",
        "object": req.user.name,
        "title": title,
        "to": [groupString]
      };

      return user1.addActivity(activity)
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
