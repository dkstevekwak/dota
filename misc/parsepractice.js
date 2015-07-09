var fs = require('fs');
var cheerio = require('cheerio');
var temp = fs.readFileSync('./body.txt').toString();

$ = cheerio.load(temp);

//console.log($("a[href^='/heroes/sniper']").first().parents('tr'));
var array = [];


$('.secondary').find('table').find('tbody').find('tr').each(function(i,elem){
  array.push([$(this).find('td').first().text(),$(this).find('td').first().next().text(),$(this).find('td').first().next().next().text()]);
});

console.log("should start here", array);

//
//each(function(i, elem){
//    console.log(elem.name);
//}));