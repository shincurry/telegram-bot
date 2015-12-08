var request = require('request');

var tg = {
    sendMessage : function(chatID, messageID, message, callback) {
        console.log("sending message");
        var baseUrl = config.telegram.url + config.telegram.token + "/sendMessage";
        var params = {
            chat_id : chatID,
            text : message
        };
        request.post({ url : baseUrl, headers : { 'content-type' : 'application/json' }, form : params }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("message 200");
                callback();
            } else {
                console.log("error in sending message.");
                console.log(error);
                console.log(response.statusCode);
            }
        });
    }
}

module.exports = tg;
