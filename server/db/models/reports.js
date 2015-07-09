'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  log: {
    type: String
  }
});


mongoose.model('Report', schema);