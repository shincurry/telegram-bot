var telegramAPI = require('../../API/telegram.js');
var crawler = require('./crawler.js');

var config = require('./config.js');


function cfcScores(message, callback) {
    crawler.getScore(config.school.username, config.school.password, function(data) {
        var text = "";
        data.forEach(function(course) {
            text += course.year + " " + course.term + "\n";
            text += course.objName + "\n";
            text += "分数: " + course.score + "\n";
            text += "-------------------\n";
        })
        telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
    });
}

function cfcAbout(message, callback) {
    var text = "All Heil CFC !!!";
    telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
}

var cfcBot = {
    reply : function(body, callback) {
        var message = body.message;
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
