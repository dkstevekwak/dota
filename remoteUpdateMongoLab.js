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
  $ = cheerio.load(rawHeroList);
  var array = [];
  $('tr').each(function(i,elem){
    array.push($(this).find("img").attr('alt'));
  });
  array.shift(); //generates list of hero names
  var heroArr = array.map(function(el){
    return el.toLowerCase().replace(/\s/g, '-').replace("\'", '');
  });

  var results = [];
  async.eachLimit(heroArr, 1, function(heroName, done){
    console.log('starting async');
      var tempheroName = heroName.replace(/-/g, '_');
      HeroStat.findOne({heroName: heroName}, function(err, foundHero){
        foundHero.heroType = "strength";
        foundHero.categories = ["carry"];
        foundHero.order = 5;
        foundHero.heroImage= 'http://cdn.dota2.com/apps/dota2/images/heroes/' + tempheroName + '_hphover.png';
        foundHero.save(function(err, heroData){
          console.log('hero updated for: ', heroName);
          done();
        });
      })
      //var obj = {
      //  heroName: heroName,
      //  heroImage: 'http://cdn.dota2.com/apps/dota2/images/heroes/' + heroName + '_hphover.png',
      //  statType: 'heroMatchUp',
      //  proficiency: []
      //};
      //var tempObj = {};
      //tempArr.forEach(function (el) {
      //  console.log('here is the element', el);
      //  tempObj = {};
      //  tempObj.name = el[0];
      //  tempObj.advantage = (el[1].replace('\.', '').replace('\%', '')) / 10000;
      //  tempObj.winRate = (el[2].replace('\.', '').replace('\%', '')) / 10000;
      //  tempObj.count = Number(el[3].replace(/\,/g, ''));
      //  console.log(tempObj);
      //  obj.proficiency.push(tempObj);
      //});
      //var hero = new HeroStat(obj);
      //hero.save(function(err, heroData){
      //  if (err) console.log(err);
      //  setTimeout(function(){
      //    done();
      //  }, 3000);
        //console.log(obj);
        //console.log('hero created?!', heroData);

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





