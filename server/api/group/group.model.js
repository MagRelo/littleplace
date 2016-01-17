'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GroupSchema = new mongoose.Schema({
  groupName: String,
  groupLocation: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  active: Boolean
});

export default mongoose.model('Group', GroupSchema);
