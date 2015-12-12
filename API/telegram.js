var request = require('request');

var tg = {
    sendMessage : function(secret, chatID, messageID, message, callback) {
        console.log("sending message");
        var baseUrl = secret.url + secret.token + "/sendMessage";
        console.log(baseUrl);
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
