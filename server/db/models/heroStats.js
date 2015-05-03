'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  heroName: String,
  heroWinRate: Number,
  heroPickRate: Number,
  heroKDA: Number,
  heroImage: String,
  heroType: String,
  categories: [String],
  order: Number,
  statType: {
    type: String,
    required: true
  },
  proficiency: [{
    name: String,
    advantage: Number,
    winRate: Number,
    count: Number
  }]
});

mongoose.model('heroStat', schema);