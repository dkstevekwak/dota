var fs = require('fs');
var cheerio = require('cheerio');
var mainPage = fs.readFileSync('./body.txt').toString();

$ = cheerio.load(mainPage);
var name = $('#content-header').find('img').attr('alt');
