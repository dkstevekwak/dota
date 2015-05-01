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
   // console.log('this is working!');
   // console.log('variable test', variables.STEAM.alexCID);
   // console.log('steamCID to long id', steam.convertToText(variables.STEAM.alexCID));
   //console.log('steamFID to long id', steam.convertTo64(variables.STEAM.alexFID));
    var options = {
      url: 'http://www.dotabuff.com/heroes/abaddon/matchups',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' }
    };
    request(options, function (error, response, body) {
      fs.writeFile('body2.txt', body, function (err) {

      });
      fs.writeFile('response2.txt', response, function (err) {

      });
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
