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

//
//each(function(i, elem){
//    console.log(elem.name);
//}));