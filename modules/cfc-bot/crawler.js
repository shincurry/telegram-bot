/**
 * Created by DoliaWu on 12/11/15.
 */

var url = require('url');
var cheerio = require('cheerio');
var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

function resolveGB2312Html(buffer) {
    var bufferHelper = new BufferHelper();
    bufferHelper.concat(buffer);
    return iconv.decode(bufferHelper.toBuffer(), 'gb2312').toString();//字符转码
}

function resolveScoreHtml(htmlbody) {
    var $ = cheerio.load(htmlbody);
    var results = [];
    $('table[class=datelist] tr').each(function (i, ele) {
        if (i == 0)//去掉表头
            return;
        var $ele = cheerio.load(ele);
        //var kind = $ele('td').eq(4).text()//课程性质
        //var belongTo = $ele('td').eq(5).text()//课程归属
        //var pointAverage = $ele('td').eq(9).text()//辅修标记
        //var makeupScore = $ele('td').eq(10).text()//补考成绩
        //var reLearnScore = $ele('td').eq(11).text()//重修成绩
        //var faculty = $ele('td').eq(11).text()//开课学院
        //var note = $ele('td').eq(11).text()//备注
        //var isReLearn = $ele('td').eq(11).text()//重修标记
        results.push({
            year: $ele('td').eq(0).text(),//学年
            term: $ele('td').eq(1).text(),//学期
            objCode: $ele('td').eq(2).text(),//课程代码
            objName: $ele('td').eq(3).text(),//课程名称
            credit: $ele('td').eq(6).text(),//学分
            pointAverage: $ele('td').eq(7).text(),//绩点
            score: $ele('td').eq(8).text(),//成绩
        });
    });
    //console.log(results)
    return results;
}

var c = {
    getScore : function (userName, passWord, callback) {
        var entryUrl = 'http://jwxt.i.cqut.edu.cn';

        request(entryUrl, function(err, res, body){
            if (err) {
                return console.log(err);
            }
            var $ = cheerio.load(body);//加载DOM
            var __viewState = $('input[name=__VIEWSTATE]').attr('value');
            var cookie = res.client._httpMessage.path.toString();
            cookie = cookie.match(/\([a-z,A-Z,0-9]*\)/);
            cookie = cookie[0];
            var loginUrl = url.resolve(entryUrl, cookie + '/Default2.aspx');
            request
                .post(loginUrl)
                .form({
                    __VIEWSTATE: __viewState,
                    txtUserName:userName,
                    TextBox2:passWord,
                    txtSecretCode:"",
                    RadioButtonList1:"%D1%A7%C9%FA",
                    Button1:"",
                    lbLanguage:"",
                    hidPdrs:"",
                    hidsc:""})
                .on('error',function(err){
                    return console.error(err);
                })
                .on('response', function(res){
                    if(res.statusCode == 302) {//登录成功
                        console.log("Login successfully");
                        var loggedInUrl = url.format({
                            "protocol":"http",
                            "host":"jwxt.i.cqut.edu.cn",
                            "pathname":cookie + "/xscjcx.aspx",
                            "query":{
                                "xh":userName,
                                "gnmkdm":"N121604"
                            }});
                        var referer = url.format({
                            "protocol":"http",
                            "host":"jwxt.i.cqut.edu.cn",
                            "pathname":cookie + "/xs_main.aspx",
                            "query":{
                                "xh":userName
                            }
                        });
                        request({
                            url:loggedInUrl,
                            encoding:null,
                            headers:{
                                Referer:referer
                            }
                        },function(err, res, body){
                            if (err) {
                                return console.log(err);
                            }
                            var $ = cheerio.load(resolveGB2312Html(body));
                            var __viewState = $('input[name=__VIEWSTATE]').attr('value');
                            //var name = $()
                            var queryUrl = url.format({
                                "protocol":"http",
                                "host":"jwxt.i.cqut.edu.cn",
                                "pathname":cookie + "/xscjcx.aspx",
                                "query":{
                                    xh:userName,
                                    gnmkdm:"N121604"
                                }
                            });
                            request.post({
                                url:queryUrl,
                                encoding:null,
                                headers:{
                                    Referer:referer
                                },
                                form:{
                                    __EVENTTARGET:'',
                                    __EVENTARGUMENT:'',
                                    __VIEWSTATE:__viewState,
                                    hidLanguage:'',
                                    ddlXN:'',
                                    ddlXQ:'',
                                    ddl_kcxz:'',
                                    btn_zcj:'%C0%FA%C4%EA%B3%C9%BC%A8'
                                }
                            } , function(err, res, body){
                                if(err){console.error(err)}
                                var htmlBody = resolveGB2312Html(body)
                                var result = resolveScoreHtml(htmlBody);
                                callback(result);
                            })
                        })
                    }
                })
        });
    }
}

module.exports = c;
