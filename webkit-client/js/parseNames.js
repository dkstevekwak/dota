$(document).ready(function () {

  var fs = require('fs');
  var os = require('os');
  var async = require('async');
  var cheerio = require('cheerio');
  var request = require('request');
  var $input = $('#input');
  var $choose = $('#choose');
  var $output = $('#status');
  var $start = $('#start');
  var path = "";
  var results = []; //eventual array of 10 player data;
  var log;
  var possiblePaths = {
    linux: "~/.steam/root/SteamApps/common/dota 2 beta/dota/server_log.txt",
    darwin: "/Library/Application Support/Steam/steamapps/common/dota 2 beta/dota/server_log.txt",
    win: "C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta/dota/server_log.txt"
  }

  var currentOS = os.platform();
  if (currentOS == "darwin") {
    path = possiblePaths.darwin;
  } else if (currentOS == "linux") {
    path = possiblePaths.linux;
  } else if (currentOS.indexOf("win") >= -1) {
    path = possiblePaths.win;
  }
  $input.val(path);
  console.log(path);

  //NOTE: fs API documentation states to use fs.watch, but its not working on macs, so using fs.watchFile.

  var startWatching = function startWatching(path){
    fs.watchFile(path, function(curr, prev){
      var allLogs = fs.readFileSync(path, {encoding: 'utf8'}, function (err, file) {
        if (err) throw err;
        console.log('inside fsRead',file);
      });

      allLogs = allLogs.split("\n");
      var log = (allLogs[allLogs.length - 1].length > 0 ) ? allLogs[allLogs.length - 1].replace(/=/, "") : allLogs[allLogs.length - 2].replace(/=/, "");
      //console.log("HERE IS THE LOG: ", log);
      //var params = [
      //  'height='+screen.height,
      //  'width='+screen.width,
      //  'fullscreen=yes' // only works in IE, but here for completeness
      //].join(',');
      //window.open("https://immense-ridge-1885.herokuapp.com/?logs=" + log, params);
      function getFriendId (entireString) {
        var pat = /U:1:(\d*)/g;
        var arrToReturn = [];
        var val;
        while (val = pat.exec(entireString)) {
          arrToReturn.push(val[1]);
        }
        console.log('hoping this runs before serverLog', arrToReturn);
        return arrToReturn;
      };

      var allFriendIDs = getFriendId(log);
      var lastTenFriendIDs = allFriendIDs.slice(0, 10);
      var results = [];
      async.forEachLimit(lastTenFriendIDs, 1, function(player, done){
        console.log('inside async now');
        var tempUrl = 'http://www.dotabuff.com/players/' + player + '/heroes?date=year&skill_bracket=&lobby_type=&game_mode=all_pick&faction=&duration=&enjoyment=any&metric=played';
        var options = {
          url: tempUrl,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
        };
        request(options, function (error, response, body) {
          console.log(body);
          var $ = cheerio.load(body);
          var array = [];
          $('tr').each(function(i,elem){
            array.push([$(this).find("img").attr('alt'), $(this).find("td").first().next().next().text(), $(this).find("td").first().next().next().next().text(), $(this).find("td").first().next().next().next().next().text()]);
          });
          array.shift(); //generates all hero stuff
          var playerName = $('#content-header').find('img').attr('alt');
          var playerInfo = [$('#content-header-secondary').find('dd').find('time').text(),$('#content-header-secondary').find('.wins').text(),$('#content-header-secondary').find('.losses').text(),$('#content-header-secondary').find('.abandons').text()];

          var obj = {
            user: playerName,
            userId: player,
            userInfo: playerInfo,
            proficiency: [],
            selectedHero: null
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
          //PersonalStat.create(obj, function(err, personalData){
          //  if(err) console.log(err);
          //  console.log('personal data created', personalData);
          results.push(obj);
          done();
          //})
          console.log('here are some results', results);
        });
      }, function(err){
        if (err) console.log(err);
        var stringified = JSON.stringify(results);
        console.log('we are inside the error handler now');
        var url = "https://immense-ridge-1885.herokuapp.com/?logs=" + log + "&playerLogs=" + stringified;
        console.log(url);
        window.open(url);
      });


    })
  }

  $start.on('click', function(){
    path = $choose.val() || path;
    startWatching(path);
    console.log($choose.val())
    $output.val("watching");
  })




});
