# Telegram-Bot

DeviantART Telegram Bot Server

work in process.

## DeviantART Bot Demo

[Deviant Bot](https://telegram.me/deviant_art_bot)

## Installation

```
$ git clone https://github.com/ShinCurry/telegram-bot.git
$ cd telegram-bot
$ cp config.example.js config.js
$ vi config.js
$ npm install
```

## Configuration

Telegram setWebHook

```
https://api.telegram.org/bot<yourToken>/setwebhook?url=<yourWebsite>/deviantart
```

edit App & Modules `conifg.js`

```
var config = {
	app : {
		url : "127.0.0.1",
		port : 3003
	}
}
```



## Modules

* DeviantART Bot
* CFC Studio Bot

## Modules Usage

DeviantART Bot

``` Javascript
var daBot = require('./modules/deviantart-bot');

daBot.reply(req.body, function() {
    console.log("responsed.");
    res.status(200).end();
});
```


## Run

```
$ npm start
```

### Running  Forever
#### Start

```
$ npm install forever -g
$ forever start app.js
```
#### Stop

```
$ forever stop app.js
```

### DeviantART Bot Commands

```
Commands list:
hot - fetch Hot DeviantART
about - About This Bot
```

## License

GPL 3.0

## Reference

* [Express.js](http://expressjs.com)
