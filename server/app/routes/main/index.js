'use strict';
var router = require('express').Router();
var Heroes = require('mongoose').model('heroStat');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req,res,next){
    Heroes.find({}, function(err,heroes){
        if (err) return next(err);
        res.send(heroes);
    })
});

router.put('/:heroId', function(req,res,next){
    Heroes.findById(req.params.heroId, function(err,hero){
        if (err) return next(err);
        var body = req.body;
        _.extend(hero, body);
        hero.save(function(err, saved){
            res.send(saved);
        })
    })
});