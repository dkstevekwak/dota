'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  log: {
    type: Mixed
  }
});


mongoose.model('Report', schema);