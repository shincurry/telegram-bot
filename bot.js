var deviantAPI = require('./API/deviantart.js');
var telegramAPI = require('./API/telegram.js');
var feed = require("feed-read");

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
    deviantAPI.getData("hot", function(data) {
        var len = data.length;
        for (var i = 0; i < len; ++i) {
            var deviant = data.results[i];
            var text = "";
            text += deviant.title + "\n";
            text += deviant.url + "\n";
            text += "@" + deviant.author.username + "\n";
            text += deviant.category + "\n";
            text += deviant.content.src + "\n";
            // console.log(deviant.title);
            // console.log(deviant.author);
            // console.log(deviant.category);
            // console.log(deviant.content);
            // console.log(deviant.url);
            telegramAPI.sendMessage(message.chat.id, message.message_id, text, callback);
        }
    });
}
function daID(message, callback) {
    console.log("/id");
    deviantAPI.getData("id", function(data) {
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
function da(message, callback) {
    console.log("/*");
    sendMessage(message.chat.id, message.message_id, "received.", callback);
}


var bot = {
    reply : function(message, callback) {
        switch (message.text) {
            // TO-DO 使用正则表达式
            case "/rss":
                daRSS(message, callback);
                break;
            case "/hot":
                daHot(message, callback);
                break;
            case "/id":
                daID(message, callback);
                break;
            case "/help":
                daHelp(message, callback);
                break;
            case "/about":
                daAbout(message, callback);
                break;
            default:
                da(message, callback);
        }
    },
}

module.exports = bot;
