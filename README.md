# DeviantART-Bot

DeviantART Telegram Bot Server

work in process.

## Bot

[Deviant Bot](https://telegram.me/deviant_art_bot)

## Installation

```
$ git clone https://github.com/ShinCurry/DeviantART-Bot.git
$ cd DeviantART-Bot
$ cp config.example.js config.js
$ vi config.js
$ npm install
```

## Configuration

Telegram setWebHook

```
https://api.telegram.org/bot<yourToken>/setwebhook?url=<yourWebsite>/deviantart
```

edit `conifg.js`

```
var config = {
	app : {
		url : "127.0.0.1",
		port : 3003
	},
	telegram : {
		url : "https://api.telegram.org/bot",
		token : "<your token>"
	},
	deviantart : {
		client_id : "<your id>",
		client_secret : "<your secret>"
	}
}
```

## Usage

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

### Bot Commands

```
Commands list:
hot - fetch Hot DeviantART
about - About This Bot
```

## License

GPL 3.0

## Reference

* [Express.js](http://expressjs.com)
