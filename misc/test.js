var fs = require('fs');
var cheerio = require('cheerio');
var rawHeroList = fs.readFileSync('./heroSpecific.txt').toString();
var async = require('async');
var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var HeroStat = mongoose.model('heroStat');
var request = require('request');

var options = {
  url: 'http://www.dotabuff.com/heroes/winning?date=patch_6.84',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
};
console.log('first');
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