'use strict';
var router = require('express').Router();
var Heroes = require('mongoose').model('heroStat');
var PersonalStat = require('mongoose').model('personalStat');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req,res,next){
    Heroes.find({}, function(err,heroes){
        if (err) return next(err);
        var sortedHeroes = heroes.sort(function(a,b){
          //console.log(a.order);
          return a.order - b.order;
        });
        //console.log(sortedHeroes.slice(0, 2).order);
      res.send(sortedHeroes);
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
router.post('/serverLog', function(req, res, next){
  console.log('we are inside server log');
  var entireString = req.body.log;
  console.log(entireString);
  function getFriendId () {
    var pat = /U:1:(\d*)/g;
    var arrToReturn = [];
    var val;
    while (val = pat.exec(entireString)) {
      arrToReturn.push(val[1]);
    }
    console.log('hoping this runs before serverLog', arrToReturn);
    return arrToReturn;
  };
  var allFriendIDs = getFriendId();
  var lastTenFriendIDs = allFriendIDs.slice(-10);
  //console.log(lastTenFriendIDs);


  console.log('here is the hypothetical list of friends ', lastTenFriendIDs );
  var results = [];
  async.forEachLimit(lastTenFriendIDs, 1, function(player, done){
    console.log('inside async now');
    var tempUrl = 'http://www.dotabuff.com/players/' + player + '/heroes?date=year&skill_bracket=&lobby_type=&game_mode=all_pick&faction=&duration=&enjoyment=any&metric=played';
    var options = {
      url: tempUrl,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
    };
    request(options, function (error, response, body) {
      var $ = cheerio.load(body);
      var array = [];
      $('tr').each(function(i,elem){
        array.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
      });
      array.shift(); //generates all hero stuff
      var playerName = $('#content-header').find('img').attr('alt');
      var playerInfo = [$('#content-header-secondary').find('dd').find('time').text(),$('#content-header-secondary').find('.wins').text(),$('#content-header-secondary').find('.losses').text(),$('#content-header-secondary').find('.abandons').text()];

      var obj = {
        user: playerName,
        userId: player,
        userInfo: playerInfo,
        proficiency: []
      };
      var tempObj = {};
      array.forEach(function (el) {
        tempObj = {};
        tempObj.name = el[0];
        tempObj.games = el[1];
        tempObj.winRate = (el[2].replace('\.', '').replace('\%', '')) / 10000;
        tempObj.kda = el[3];
        obj.proficiency.push(tempObj);
      });
      //PersonalStat.create(obj, function(err, personalData){
      //  if(err) console.log(err);
      //  console.log('personal data created', personalData);
        results.push(obj);
        done();
      //})
      console.log('here are some results', results);
    });
  }, function(err){
    res.json(results).end();
  })
  //for each player
  //parse player specific data
  //push to database based on friendID
  //create a proficiency hash object
  //pass to front end
});






