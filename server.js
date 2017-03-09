var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , test = require('jade').compileFile(__dirname + '/source/templates/other.jade')
  , albinso = "http://www.albinso.com"

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/other', function (req, res, next) {
  try {
    var html = test({ title: '[Censored]' })
    res.send(html)
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
