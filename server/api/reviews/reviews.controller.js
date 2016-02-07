/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviewss              ->  index
 * POST    /api/reviewss              ->  create
 * GET     /api/reviewss/:id          ->  show
 * PUT     /api/reviewss/:id          ->  update
 * DELETE  /api/reviewss/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Reviews from './reviews.model';


var stream = require('getstream');

// Instantiate a new client (server side)
var client = stream.connect('3d9sxz5ev2sh', 'qmjx4f8yhn9ksv9v7g89jeyapygvu5bnt678rf8eqxnvtvt9dk5j4t2m7s3fpsfy', '9030');


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

// Gets a list of Reviewss
export function index(req, res) {
  Reviews.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reviews from the DB
export function show(req, res) {
  Reviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Reviews in the DB
export function create(req, res) {
  Reviews.createAsync(req.body)
    .then(function (doc) {

      // Instantiate a feed using feed class 'user' and user id '1'
      const user1 = client.feed('user', req.user._id);

      const actorString = "User:" + req.user._id
      const title = '<span><span class="placeName">'
        + doc.placeName
        + '</span><span class="userName">'
        + req.user.name
        + '</span></span>'

      // Add an activity to the feed
      const activity = {
        "actor": actorString,
        "verb": "createReview",
        "object": JSON.stringify(req.body),
        "title": title,
        "foreign_id": doc._id
      };

      return user1.addActivity(activity)
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Reviews in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Reviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reviews from the DB
export function destroy(req, res) {
  Reviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
