'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReviewsSchema = new mongoose.Schema({
  place: String,
  rating: String,
  review: String,
  active: Boolean,
  when: Date
});

export default mongoose.model('Reviews', ReviewsSchema);
