'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Member = require('../user/user.model.js')

var GroupSchema = new mongoose.Schema({
  name: String,
  members: [Member],
  active: Boolean
});

export default mongoose.model('Group', GroupSchema);
