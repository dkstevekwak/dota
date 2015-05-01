/*

 This seed file is only a placeholder. It should be expanded and altered
 to fit the development of your application.

 It uses the same file the server uses to establish
 the database connection:
 --- server/db/index.js

 The name of the database used is set in your environment files:
 --- server/env/*

 This seed file has a safety check to see if you already have users
 in the database. If you are developing multiple applications with the
 fsg scaffolding, keep in mind that fsg always uses the same database
 name in the environment files.

 Refer to the q documentation for why and how q.invoke is used.

 */

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var HeroStat = mongoose.model('heroStat');
var fs = require('fs');
var cheerio = require('cheerio');
var temp = fs.readFileSync('./heroSpecific.txt').toString();

$ = cheerio.load(temp);

//console.log($("a[href^='/heroes/sniper']").first().parents('tr'));
var array = [];


$('tr').each(function(i,elem){
  array.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
});
array.shift();
console.log("should start here", array);


connectToDb.then(function () {
  var results = [];
  var obj = {
    heroName: 'Abaddon',
    statType: 'heroMatchUp',
    proficiency: []
  };
  var tempObj = {};
  array.forEach(function (el) {
    tempObj = {};
    tempObj.name = el[0];
    tempObj.advantage = (el[1].replace('\.', '').replace('\%', '')) / 10000;
    tempObj.winRate = (el[2].replace('\.', '').replace('\%', '')) / 10000;
    tempObj.count = Number(el[3].replace(',', ''));
    obj.proficiency.push(tempObj);
  });
  //fs.writeFile('testSeed2.txt', array, function (err) {
  //
  //});
  console.log('OBJ HERE', obj);
  HeroStat.create(obj, function(err, heroData){
    console.log(heroData);

  }).then(function () {
    process.kill(0);
  }).catch(function (err) {
    console.error(err);
    process.kill(1);
  });
});