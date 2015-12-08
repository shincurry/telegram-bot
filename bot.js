var deviantAPI = require('./API/deviantart.js');
var telegramAPI = require('./API/telegram.js');
var feed = require("feed-read");

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

function daRSS(message, callback) {
    var daRSS = "http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Adigitalart%2Fdrawings";
    feed(daRSS, function(err, articles) {
        if (err) throw err;
        text = "temp rss";
        telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
    });
}


function daHot(message, callback) {
    console.log("/hot");
    deviantAPI.getHot(function(data) {
        if (data.error) {
            callback();
            return;
        }
        var deviant = data.results;
        deviant.forRandom(3, function(element) {
            var text = "";
            text += "Author @ " + element.author.username + "\n";
            text += "Category # " + element.category + "\n";
            text += element.url;
            telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
        });
    });
}
function daID(message, callback) {
    console.log("/id");
    if (message.text[1] == "") {
        callback();
        return;
    }
    deviantAPI.getProfile(message.text[1], function(data) {
        if (data.error) {
            console.log(data);
            telegramAPI.sendMessage(message.chat.id, message.message_id, data.error_description, callback);
            return;
        }
        var text = "ID: " + data.user.username + "\n";
        if (data.country != "") {
            text += "Country: " + data.country + "\n";
        }
        if (data.website != "") {
            text += "Website: " + data.website + "\n";
        }
        text += data.profile_url;
        telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
    });
}
function daAbout(message, callback) {
    console.log("/about");
    telegramAPI.sendMessage(message.chat.id, message.message_id, config.info.about, callback);
}
function daHelp(message, callback) {
    console.log("/help");
    telegramAPI.sendMessage(message.chat.id, message.message_id, config.info.help, callback);
}

var bot = {
    reply : function(message, callback) {
        message.text = message.text.split(" ", 5);
        switch (message.text[0]) {
            // TO-DO 使用正则表达式
            // case "/rss":
            // case "/rss" + config.bot.id:
            //     daRSS(message, callback);
            //     break;
            case "/hot":
            case "/hot" + config.bot.id:
                daHot(message, callback);
                break;
            case "/id":
            case "/id" + config.bot.id:
                daID(message, callback);
                break;
            case "/help":
            case "/help" + config.bot.id:
                daHelp(message, callback);
                break;
            case "/about":
            case "/about" + config.bot.id:
                daAbout(message, callback);
                break;
            default:
                callback();
        }
    },
}

module.exports = bot;
