var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var config = require('./config.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var daBot = require('./modules/deviantart-bot');
var cfcBot = require('./modules/cfc-bot');

app.post('/deviantart', function(req, res) {
    console.log("get /deviantart POST request");

    daBot.reply(req.body, function() {
        console.log('responsed.');
        res.status(200).end();
    });
});

app.post('/cfc', function(req, res) {
    console.log('get /cfc POST request');

    cfcBot.reply(req.body, function() {
        console.log('responsed.');
        res.status(200).end();
    })
})

app.listen(config.app.port, config.app.url, function() {
        console.log('app run in ' + config.app.url + ':' + config.app.port);
});
