var fs = require('fs');
var cheerio = require('cheerio');
var rawHeroList = fs.readFileSync('./heroSpecific.txt').toString();
var async = require('async');
var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var HeroStat = mongoose.model('heroStat');
var request = require('request');

//generates the hero list of everyone except abaddon and adds them to database!

connectToDb.then(function () {
    //$ = cheerio.load(rawHeroList);
    //var array = ['abaddon'];
    //$('tr').each(function(i,elem){
    //  array.push($(this).find("img").attr('alt'));
    //});
    //array.shift(); //generates list of hero names
    //var heroArr = array.map(function(el){
    //  return el.toLowerCase().replace(/\s/g, '-').replace("\'", '');
    //});
    //instead of using local array, using cheerio to load highest win rate data and pass a hero object to the later funciton;
    var options = {
      url: 'http://www.dotabuff.com/heroes/winning?date=patch_6.84',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
    };
    var initialHeroArray = [];
    request(options, function(error, response, body){
      console.log('second request started');
      if (error) console.log('heres an error', error);
      if (response) console.log('heres an response', response);
      if (body) console.log('heres a body', body);
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        $('tr').each(function(i,elem){
          initialHeroArray.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
        });
        initialHeroArray.shift();//an array of hero name, win rate, pick rate, and KDA ratio
      }
      initialHeroArray = initialHeroArray.map(function(hero){
        if (hero[0]){
          hero[0] = hero[0].toLowerCase().replace(/\s/g, '-').replace("\'", '')
        }
        return hero;
      });
      console.log('first request complete ', initialHeroArray);
    });
    var results = [];
    async.eachLimit(initialHeroArray, 1, function(hero, done){
      console.log('starting async');
      var tempUrl = 'http://www.dotabuff.com/heroes/' + hero[0] + '/matchups?date=patch_6.84'; //hero[0] is the name;
      var options = {
        url: tempUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
      };
      request(options, function (error, response, body) {
        console.log('this hero hero' + heroName, body);
        var tempArr = [];
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(body);
          $('tr').each(function(i,elem){
            tempArr.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
          });
          tempArr.shift();
        }
        var obj = {
          heroName: hero[0],
          heroWinRate: (hero[1].replace('\.', '').replace('\%', '')) / 10000,
          heroPickRate: (hero[2].replace('\.', '').replace('\%', '')) / 10000,
          heroKDA: (hero[3].replace('\.', '').replace('\%', '')) / 10000,
          heroImage: 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero[0] + '_hphover.png',
          statType: 'heroMatchUp',
          proficiency: []
        };
        var tempObj = {};
        tempArr.forEach(function (el) {
          console.log('here is the element', el);
          tempObj = {};
          tempObj.name = el[0];
          tempObj.advantage = (el[1].replace('\.', '').replace('\%', '')) / 10000;
          tempObj.winRate = (el[2].replace('\.', '').replace('\%', '')) / 10000;
          tempObj.count = Number(el[3].replace(/\,/g, ''));
          console.log(tempObj);
          obj.proficiency.push(tempObj);
        });
        HeroStat.findOne({heroName: hero[0]}, function(err, foundHero){
          if(err) console.log(err);
          _.extend(foundHero, obj);
          hero.save(function(err, heroData){
            if (err) console.log(err);
            done();
            //setTimeout(function(){
            //  done();
            //}, 1000);
            //console.log(obj);
            //console.log('hero created?!', heroData);
          })
        })

      })//closes request
  }, function(err){
    if (err) console.log('uh oh error', err);
      console.log('all done!');
      process.kill(0);
  }).then(function () {
      process.kill(0);
    }).catch(function (err) {
      console.error(err);
      process.kill(1);
    });
});





