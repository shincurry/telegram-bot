var TelegramBot = require('../../API/telegram.js');
var deviantAPI = require('./deviantart.js');

var config = require('./config.js');

var tg = TelegramBot(config.token);
tg.configure(config.info);

/**
 * callback with N numbers selected from an array Randomly
 * @param  {Number}   n        [count of random numbers]
 * @param  {Function} callback [for each random number callback]
 */
Array.prototype.forRandom = function(n, callback) {
    if (n >= this.length) {
        this.forEach(function(element) { callback(element); });
        return;
    }
    var temp = [];
    this.forEach(function(element, index) { temp[index] = element; });
    var len = temp.length;
    for (var i = 0; i < n; i++) {
        var index = parseInt(Math.random() * 100) % len;
        callback(temp[index]);
        temp[index] = temp[--len];
    }
}

function daStart(message, callback) {
    tg.sendMessage({ chat_id : message.chat.id, text : 'Hello, ' + message.chat.first_name || World + '.' }, callback);
}

function daHot(message, callback) {
    console.log('/hot');
    deviantAPI.getHot(function(data) {
        if (data.error) {
            callback();
            return;
        }
        var deviant = data.results;
        deviant.forRandom(3, function(element) {
            var text = '';
            text += 'Author @ ' + element.author.username + '\n';
            text += 'Category # ' + element.category + '\n';
            text += element.url;

            tg.sendMessage({ chat_id : message.chat.id, text : text }, callback);
        });
    });
}
function daID(message, callback) {
    console.log('/id');
    if (message.text[1] == '') {
        callback();
        return;
    }
    deviantAPI.getProfile(message.text[1], function(data) {
        if (data.error) {
            console.log(data);
            tg.sendMessage({
                chat_id : message.chat.id,
                text : data.error_description
            }, callback);
            return;
        }
        var text = 'ID: ' + data.user.username + '\n';
        if (data.country != 'Unknown') {
            text += 'Country: ' + data.country + '\n';
        }
        if (data.website != '') {
            text += 'Website: ' + data.website + '\n';
        }
        text += data.profile_url;
        tg.sendMessage({ chat_id : message.chat.id, text : text }, callback);
    });
}
function daAbout(message, callback) {
    console.log('/about');
    tg.sendMessage({ chat_id : message.chat.id, text : tg.info.about }, callback);
}
function daHelp(message, callback) {
    console.log('/help');
    tg.sendMessage({ chat_id : message.chat.id, text : tg.info.help }, callback);
}

var daBot = {
    reply : function(body, callback) {
        var message = body.message;
        if (message.text == undefined) {
            callback();
            return;
        }
        message.text = message.text.split(" ", 5);
        switch (message.text[0]) {
            // TODO: 使用正则表达式
            case '/start':
                daStart(message, callback);
                break;
            case '/hot':
            case '/hot' + config.bot.info.id:
                daHot(message, callback);
                break;
            case '/id':
            case '/id' + config.bot.info.id:
                daID(message, callback);
                break;
            case '/help':
            case '/help' + config.bot.info.id:
                daHelp(message, callback);
                break;
            case '/about':
            case '/about' + config.bot.info.id:
                daAbout(message, callback);
                break;
            default:
                callback();
        }
    }
}

module.exports = daBot;
