$(document).ready(function () {

  var fs = require('fs');
  var os = require('os');
  var $input = $('#input');
  var $output = $('#status');
  var path = "";
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

  console.log(path);

  //NOTE: fs API documentation states to use fs.watch, but its not working on macs, so using fs.watchFile.

  fs.watchFile(path, function(curr, prev){
    var allLogs = fs.readFileSync(path, {encoding: 'utf8'}, function (err, file) {
      if (err) throw err;
      console.log('inside fsRead',file);
    });

    allLogs = allLogs.split("\n");
    var log = (allLogs[allLogs.length - 1].length > 0 ) ? allLogs[allLogs.length - 1].replace(/=/, "") : allLogs[allLogs.length - 2].replace(/=/, "");
    console.log("HERE IS THE LOG: ", log);
    var params = [
      'height='+screen.height,
      'width='+screen.width,
      'fullscreen=yes' // only works in IE, but here for completeness
    ].join(',');
    window.open("https://immense-ridge-1885.herokuapp.com/?logs=" + log, params);
  })
  // ---------------------------------------------------------------------

  function parser(){

  }




});
