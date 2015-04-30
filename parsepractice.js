var fs = require('fs');
var cheerio = require('cheerio');
var temp = fs.readFileSync('./body.txt').toString();



  $ = cheerio.load(temp);
  console.log($('h2').text());