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
var playerInfo = $('#content-header-secondary').find('time').text()
console.log(playerInfo);

//
//each(function(i, elem){
//    console.log(elem.name);
//}));