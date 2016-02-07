/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/activity              ->  index
 * POST    /api/activity              ->  create
 * GET     /api/activity/:id          ->  show
 * PUT     /api/activity/:id          ->  update
 * DELETE  /api/activity/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Activity from './activity.model';


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

// Gets a list of Activitys
export function index(req, res) {

  // Instantiate a feed using feed class 'user' and user id '1'
  const user1 = client.feed('user', req.user._id);

  user1.get({limit:50, offset: 0})
    .then(respondWithResult(res))
    .catch(handleError(res));

}


// ---------


// Gets a single Activity from the DB
export function show(req, res) {
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Activity in the DB
export function create(req, res) {
  Activity.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Activity in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Activity from the DB
export function destroy(req, res) {
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
