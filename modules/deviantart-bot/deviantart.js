var request = require('request');

var config = require("./config.js");

var accessTokenUrl = "https://www.deviantart.com/oauth2/token?grant_type=client_credentials&client_id=" + config.deviantart.client_id + "&client_secret=" + config.deviantart.client_secret;
var baseUrl = "https://www.deviantart.com/api/v1/oauth2";
var requestUrl = {
    browse : {
        hot : baseUrl + "/browse/hot",
        dailydeviations : baseUrl + "/browse/dailydeviations"
    },
    user : {
        profile : baseUrl + "/user/profile"
    }
}

var accessToken = {
    ExpireTime : 0,
    data : "",
    ok : false
}

function updateAccessToken(callback) {
    console.log("updating AccessToken();");
    request(accessTokenUrl, function (error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode != 200) {
            console.log(response.body);
            return;
        }
        var body = JSON.parse(response.body);
        accessToken.data = body.access_token;
        accessToken.ExpireTime = body.expires_in * 1000;
        accessToken.ok = true;
        console.log(accessToken.data);
        console.log("updated AccessToken");
        callback();
    });
}

updateAccessToken(function() {
    setInterval(updateAccessToken, accessToken.ExpireTime - 600000);
});

function requestDeviantAPI(query, callback) {
    request(query, function (error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        var temp = JSON.parse(response.body);
        console.log("getData 200");
        callback(temp);

    });
}

var da = {
    getHot : function(callback) {
        var query = requestUrl.browse.hot + "?access_token=" + accessToken.data;
        requestDeviantAPI(query, callback);
    },
    getProfile : function(id, callback) {
        var query = requestUrl.user.profile + "/" + id + "?access_token=" + accessToken.data;
        console.log(query);
        requestDeviantAPI(query, callback);
    }
}

module.exports = da;
