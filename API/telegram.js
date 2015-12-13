var request = require('request');
var telegramApiUrl = 'https://api.telegram.org/bot';

var TelegramBot = function(token) {
    this.token = token;
    this.info = {
        about : 'Telegram Bot',
        id : '@telegram',
        help : 'Help',
    }
}

/**
 * configure bot
 * @param  {[Object]}   conf [bot config]
 */
TelegramBot.prototype.configure = function(conf) {
    if (conf.id) this.info.id;
    if (conf.about) this.info.about;
    if (conf.help) this.info.help;
}

/**
 * send message to user
 * @param  {Object}   requires [required params : { chat_id, text }]
 * @param  {Function} callback [send message successful callback]
 * @param  {Object}   options  [optional params : { parse_mode, disable_web_page_preview, reply_to_message_id, reply_markup }]
 */
TelegramBot.prototype.sendMessage = function(requires, callback, options) {
    var baseUrl = telegramApiUrl + this.token + '/sendMessage';
    var form = options || {};
    console.log('sending message');
    console.log(baseUrl);
    form.chat_id = requires.chat_id;
    form.text = requires.text;
    request.post({ url : baseUrl, headers : { 'content-type' : 'application/json' }, form : form }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('message 200');
            callback();
        } else {
            console.log('error in sending message.');
        }
    });
}

// TODO sendPhoto function

/**
 * send photo to user
 * @param  {Object}   requires [description]
 * @param  {Function} callback [description]
 * @param  {Object}   options  [description]
 */
TelegramBot.prototype.sendPhoto = function(requires, callback, options) {
    var baseUrl = telegramApiUrl + this.token + '/sendPhoto';
}


/**
 * get bot information
 * @param  {Function} callback [send message successful callback]
 */
TelegramBot.prototype.getMe = function(callback) {
    var baseUrl = telegramApiUrl + this.token + '/getMe';
    console.log(baseUrl);
    request(baseUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('message 200');
            callback(response.body);
        } else {
            console.log('error in sending message.');
        }
    });
}



module.exports = TelegramBot;
