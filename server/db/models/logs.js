'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  info: {
    type: String
  }
});


mongoose.model('Log', schema);