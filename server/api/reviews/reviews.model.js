'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReviewsSchema = new mongoose.Schema({
  placeName: String,
  rating: String,
  phone: String,
  address: String,
  location: {
    type : { type: String, default: "Point" },
    coordinates: [{type: "Number"}]
  },
  thumbs: String,
  comments: String,
});

export default mongoose.model('Reviews', ReviewsSchema);
