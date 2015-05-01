'use strict';
var router = require('express').Router();
var Heroes = require('mongoose').model('heroStat');
module.exports = router;

router.get('/', function(req,res,next){
    Heroes.find({}, function(err,heroes){
        if (err) return next(err);
        res.send(heroes);
    })
});