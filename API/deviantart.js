var request = require('request');

var requestUrl = {
    access_token : "https://www.deviantart.com/oauth2/token?grant_type=client_credentials&client_id=" + config.deviantart.client_id + "&client_secret=" + config.deviantart.client_secret,
    hot : "https://www.deviantart.com/api/v1/oauth2/browse/hot",
    id : ""
}

setInterval(function() {
    console.log("updating AccessToken();");
    request(requestUrl.access_token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(response.body);
            accessToken.data = body.access_token;
            accessToken.ExpireTime = body.expires_in;
            accessToken.ok = true;
            console.log(accessToken.data);
            console.log("updated AccessToken");
        } else {
            console.log("error");
            console.log(error);
            console.log(response.statusCode);
        }
    });
}, accessToken.ExpireTime - 600);

var accessToken = {
    ExpireTime : 3600,
    data : {},
    ok : false
}

var da = {
    getData : function(type, callback) {
        var query = requestUrl[type] + "?access_token=" + accessToken.data;
        // var query = requestUrl[type] + "?access_token=75d936e70d43aa9bdfb03cf788f14643a11a7e0ce7f6e40ba4";
        request(query, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var temp = JSON.parse(response.body);
                callback(temp);
            } else {
                console.log("error");
                console.log(error);
                console.log(response.statusCode);
            }
        });
    }
}

module.exports = da;
