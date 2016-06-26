/**
 * Reviews model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Reviews = require('./reviews.model');
var ReviewsEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ReviewsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reviews.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ReviewsEvents.emit(event + ':' + doc._id, doc);
    ReviewsEvents.emit(event, doc);
  };
}

exports['default'] = ReviewsEvents;
module.exports = exports['default'];
//# sourceMappingURL=reviews.events.js.map
