# DeviantART-Bot

DeviantART Telegram Bot Server

work in process.

## Installation

```
$ git clone https://github.com/ShinCurry/DeviantART-Bot.git
$ cd DeviantART-Bot
$ cp config.example.js config.js
$ vi config.js
$ npm install
```

## Configuration

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
test - Command Test
hot - fetch Hot DeviantART
id - fetch someone's page link
help - Bot Help
about - About This Bot
rss - get DeviantART RSS
```

## Reference

* [Express.js](http://expressjs.com)
