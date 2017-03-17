var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , test = require('jade').compileFile(__dirname + '/source/templates/other.jade')
  , drinking = require('jade').compileFile(__dirname + '/source/templates/drinking.jade')

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var path = require('path');

var albinso = "http://www.albinso.com"

var url = 'mongodb://127.0.0.1:3000/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
});

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
 	try {
		var html = template({ title: 'Home'})
		res.send(html)
	} catch (e) {
		next(e)
	}
})

app.get('/other', function (req, res, next) {
	try {
		var html = test({ title: '[Censored]'})
		res.send(html)
	} catch (e) {
		next(e)
	}
})

app.get('/drinking_games', function (req, res, next) {
	try {
		res.sendFile(path.join(__dirname+'/source/html-files/drinking_games.html'));
	} catch (e) {
		next(e)
	}
})

app.get('/albinso', function (req, res, next) {
  try {
    return res.redirect(albinso);
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
