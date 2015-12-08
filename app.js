var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

config = require('./config.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var bot = require('./bot.js');

app.post('/deviantart', function(req, res) {
    console.log("get POST request");
    var update = req.body;
    var message = update.message;

    bot.reply(req.body.message, function() {
        console.log("responsed.");
        res.status(200).end();
    });

});

app.listen(config.app.port, config.app.url, function() {
        console.log("app run in " + config.app.url + ":" + config.app.port);
});
