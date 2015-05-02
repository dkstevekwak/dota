'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique : true
  },
  userID: String,
  proficiency: [{
    name: String,
    games: Number,
    winRate: Number,
    kda: Number
  }]
});

mongoose.model('personalStat', schema);
