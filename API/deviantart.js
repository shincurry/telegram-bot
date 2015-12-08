var request = require('request');
var baseUrl = "https://www.deviantart.com/api/v1/oauth2";
var requestUrl = {
    access_token : "https://www.deviantart.com/oauth2/token?grant_type=client_credentials&client_id=" + config.deviantart.client_id + "&client_secret=" + config.deviantart.client_secret,
    hot : baseUrl + "/browse/hot",
    profile : baseUrl + "/user/profile/",
    dailydeviations : baseUrl + "/browse/dailydeviations"
}
var accessToken = {
    ExpireTime : 0,
    data : "",
    ok : false
}

function updateAccessToken(callback) {
    console.log("updating AccessToken();");
    request(requestUrl.access_token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(response.body);
            accessToken.data = body.access_token;
            accessToken.ExpireTime = body.expires_in * 1000;
            accessToken.ok = true;
            console.log(accessToken.data);
            console.log("updated AccessToken");
            callback();
        } else {
            console.log("error");
            console.log(error);
            console.log(response.statusCode);
        }
    });
}

updateAccessToken(function() {
    setInterval(updateAccessToken, accessToken.ExpireTime - 600000);
});




var da = {
    getData : function(type, callback) {
        var query = requestUrl[type] + "?access_token=" + accessToken.data;
        console.log(query);
        // var query = requestUrl[type] + "?access_token=75d936e70d43aa9bdfb03cf788f14643a11a7e0ce7f6e40ba4";
        request(query, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var temp = JSON.parse(response.body);
                console.log(getData 200);
                console.log(temp);
                callback(temp.results);
            } else {
                console.log("error in getData");
                console.log(error);
                console.log(response.statusCode);
            }
        });
    }
}

module.exports = da;
