'use strict';
var path = require('path');
var express = require('express');
var app = express();
var variables = require('../env/');
var steam = require('steamidconvert')();
var request = require('request');
var fs = require('fs');

module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


/*
    This middleware will catch any URLs resembling a file extension
    for example: .js, .html, .css
    This allows for proper 404s instead of the wildcard '/*' catching
    URLs that bypass express.static because the given file does not exist.
*/
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    console.log('this is working!');
   // console.log('variable test', variables.STEAM.alexCID);
   // console.log('steamCID to long id', steam.convertToText(variables.STEAM.alexCID));
   //console.log('steamFID to long id', steam.convertTo64(variables.STEAM.alexFID));
   // var options = {
   //   url: 'http://www.dotabuff.com/heroes/abaddon/matchups',
   //   headers: {
   //     'content-type': 'application/x-www-form-urlencoded',
   //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
   // };
   // var Ids = ['U:1:225848454',
   //     'U:1:209562277',
   //     'U:1:242521056',
   //     'U:1:209893205',
   //     'U:1:262216692',
   //     'U:1:112248000',
   //     'U:1:171066904',
   //     'U:1:111978256',
   //     'U:1:101851611',
   //     'U:1:94247651'];
   //
   // // These Ids have to be replaced by data received from reading the log file.
   //
   // //[U:1:225848454] 1:[U:1:209562277] 2:[U:1:242521056] 3:[U:1:209893205] 4:[U:1:262216692] 5:[U:1:112248000] 6:[U:1:171066904] 7:[U:1:111978256] 8:[U:1:101851611] 9:[U:1:94247651]) (Party 23997006225391493 0:[U:1:209562277] 1:[U:1:242521056] 2:[U:1:209893205])
   //
   // var mappedIds = Ids.map(function(eachId){
   //     return steam.convertTo64(eachId);
   // })
   //
   // var stringIds = mappedIds.toString();
   // console.log(stringIds);
   // request('http://api.steampowered.com/isteamuser/getplayersummaries/v0002/?key=B6622CA506F173656A89DCB17CE8E454&steamids=' + stringIds, function(err,response,body){
   //     console.log(body);
   //     //replace this with data feed later.
   // });

    request(options, function (error, response, body) {
      //fs.writeFile('body2.txt', body, function (err) {
      //
      //});
      //fs.writeFile('response2.txt', response, function (err) {
      //
      //});
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
        res.sendFile(app.get('indexHTMLPath'));
      }
    })

});


// Error catching endware.
app.use(function (err, req, res) {
    // console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
