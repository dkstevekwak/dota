'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  heroName: String,
  heroImage: String,
  heroType: String,
  categories: [String],
  statType: {
    type: String,
    required: true,
    unique : true
  },
  proficiency: [{
    name: String,
    advantage: Number,
    winRate: Number,
    count: Number
  }]
});

mongoose.model('heroStat', schema);
