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
var PersonalStat = mongoose.model('personalStat');
var fs = require('fs');
var cheerio = require('cheerio');
var temp = fs.readFileSync('./heroText.txt').toString();

$ = cheerio.load(temp);

//console.log($("a[href^='/heroes/sniper']").first().parents('tr'));
var array = [];


$('tr').each(function(i,elem){
  array.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
});

array.shift();


connectToDb.then(function () {
  var results = [];
  var obj = {
    user: 'alex',
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
  PersonalStat.create(obj, function(err, personalData){
    console.log(personalData);

  }).then(function () {
    process.kill(0);
  }).catch(function (err) {
    console.error(err);
    process.kill(1);
  });
});