var fs = require('fs');
var cheerio = require('cheerio');
var temp = fs.readFileSync('./body.txt').toString();

$ = cheerio.load(temp);

//console.log($("a[href^='/heroes/sniper']").first().parents('tr'));
var array = [];
console.log('table', $('.secondary').find('table').find('tbody').html());
console.log('table', $('.secondary').find('table').find('tbody').next().text());
console.log('table', $('.secondary').find('table').find('tbody').next());
//console.log('next', $('.secondary').find('table').firstChild().next().next().html());

//$('tr').each(function(i,elem){
//  array.push([$(this).find("img").attr('alt')]);
//});

console.log("should start here", array);

//
//each(function(i, elem){
//    console.log(elem.name);
//}));