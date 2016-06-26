'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReviewsSchema = new mongoose.Schema({
  placeName: String,
  rating: String,
  phone: String,
  address: String,
  location: {
    type: { type: String, 'default': "Point" },
    coordinates: [{ type: "Number" }]
  },
  thumbs: String,
  comments: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

exports['default'] = mongoose.model('Reviews', ReviewsSchema);
module.exports = exports['default'];
//# sourceMappingURL=reviews.model.js.map
