var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

config = require('./config.js');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/', function(req, res) {
    var update = req.body;
    var message = update.message;
    sendMessage(message.chat.id, message.message_id);
    console.log(req.body);
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    res.status(200).end();
})

function sendMessage(chatID, messageID) {
    var query = config.telegram.url + config.telegram.token + "/sendMessage?chat_id=" + chatID + "&text=receive" + "&reply_to_message_id=" + messageID;
    request(query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("ok");
        } else {
            console.log(error);
        }
    });
}

app.listen(config.app.port, config.app.url, function() {
        console.log("app run in " + config.app.url + ":" + config.app.port);
});
