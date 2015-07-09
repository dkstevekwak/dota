'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  log: {
    type: mongoose.Schema.Types.Mixed
  }
});


mongoose.model('Report', schema);