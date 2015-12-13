var crawler = require('./crawler.js');
var TelegramBot = require('../../API/telegram.js');
var config = require('./config.js');

var tg = TelegramBot(config.token);
tg.configure(config.info);

function cfcStart(message, callback) {
    tg.sendMessage({ chat_id : message.chat.id, text : 'Hello, ' + message.chat.first_name || World + '.' }, callback);
}

function cfcScores(message, callback) {
    if (message.text[1] == undefined || message.text[2] == undefined) {
        tg.sendMessage({ chat_id : message.chat.id, text : '请输入正确的帐号密码' }, callback);
        return;
    }
    console.log('usr: ' + message.text[1] + ' pw: ' + message.text[2]);
    crawler.getScore(message.text[1], message.text[2], function(data) {
        //console.log(data);
        var text = '';
        data.forEach(function(course) {
            text += course.year + ' ' + course.term + '\n';
            text += course.objName + '\n';
            text += '分数: ' + course.score + '\n';
            text += '-------------------\n';
        })
        tg.sendMessage({ chat_id : message.chat.id, text : text }, callback);
    });
}

function cfcAbout(message, callback) {
    var text = 'All Heil CFC !!!';
    tg.sendMessage({ chat_id : message.chat.id, text : text }, callback);
}

var cfcBot = {
    reply : function(body, callback) {
        var message = body.message;
        if (message.text == undefined) {
            callback();
            return;
        }
        message.text = message.text.split(' ', 5);
        switch (message.text[0]) {
            case '/start':
                cfcStart(message, callback);
                break;
            case '/scores':
            case '/scores' + config.bot.info.id:
                cfcScores(message, callback);
                break;
            case '/about':
            case '/about' + config.bot.info.id:
                cfcAbout(message, callback);
                break;
            default:
                callback();
        }
    }
}

module.exports = cfcBot;
