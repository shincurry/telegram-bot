var telegramAPI = require('../../API/telegram.js');
var crawler = require('./crawler.js');

var config = require('./config.js');

function cfcScores(message, callback) {
    if (message.text[1] == undefined || message.text[2] == undefined) {
        callback();
        return;
    }
    console.log("usr: " + message.text[1] + " pw:" + message.text[2]);
    crawler.getScore(message.text[1], message.text[2], function(data) {
        //console.log(data);
        var text = "";
        data.forEach(function(course) {
            text += course.year + " " + course.term + "\n";
            text += course.objName + "\n";
            text += "分数: " + course.score + "\n";
            text += "-------------------\n";
        })
        telegramAPI.sendMessage(config.bot.secret, message.chat.id, message.message_id, text, callback);
    });
}

function cfcAbout(message, callback) {
    var text = "All Heil CFC !!!";
    telegramAPI.sendMessage(config.bot.secret, message.chat.id, message.message_id, text, callback);
}

var cfcBot = {
    reply : function(body, callback) {
        var message = body.message;
        if (message.text == undefined) {
            callback();
            return;
        }
        message.text = message.text.split(" ", 5);
        switch (message.text[0]) {
            case "/scores":
            case "/scores" + config.bot.id:
                cfcScores(message, callback);
                break;
            case "/about":
            case "/about" + config.bot.id:
                cfcAbout(message, callback);
                break;
            default:
                callback();
        }
    }
}

module.exports = cfcBot;
