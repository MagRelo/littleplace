/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviewss              ->  index
 * POST    /api/reviewss              ->  create
 * GET     /api/reviewss/:id          ->  show
 * PUT     /api/reviewss/:id          ->  update
 * DELETE  /api/reviewss/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reviewsModel = require('./reviews.model');

var _reviewsModel2 = _interopRequireDefault(_reviewsModel);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var stream = require('getstream');
// Instantiate a new client (server side)
var client = stream.connect('3d9sxz5ev2sh', 'qmjx4f8yhn9ksv9v7g89jeyapygvu5bnt678rf8eqxnvtvt9dk5j4t2m7s3fpsfy', '9030');

// Gets a list of Reviews

function index(req, res) {

  var streamUserFeed = client.feed('user', req.user._id);

  streamUserFeed.get({ limit: 50, offset: 0 }).then(function (streamUserFeedResults) {

    var reviewIds = streamUserFeedResults.results.map(function (activity) {
      return _mongoose2['default'].Types.ObjectId(activity.object);
    });

    return _reviewsModel2['default'].find({ _id: { $in: reviewIds } }).populate('user');
  }).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Reviews in the DB

function create(req, res) {
  _reviewsModel2['default'].createAsync(req.body).then(function (doc) {

    var activityTitle = '<span><span class="placeName">' + doc.placeName + '</span><span class="userName">' + req.user.name + '</span></span>';

    var activity = {
      "verb": "createReview",
      "title": activityTitle,
      "actor": "User:" + req.user._id,
      "object": doc._id,
      "foreign_id": req.user._id
    };

    // Instantiate stream.io user feed
    var streamUserFeed = client.feed('user', req.user._id);

    // Add activity
    return streamUserFeed.addActivity(activity);
  }).then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Gets a single Reviews from the DB

function show(req, res) {
  _reviewsModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Updates an existing Reviews in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _reviewsModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Deletes a Reviews from the DB

function destroy(req, res) {
  _reviewsModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}
//# sourceMappingURL=reviews.controller.js.map
