var fs = require('fs');
var cheerio = require('cheerio'),
  $ = cheerio.load('<h2 class = "title">Hello world</h2>');