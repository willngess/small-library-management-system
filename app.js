var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cookiesession = require('cookie-session')
var moment = require('moment')

// 数据库引入以及连接
var mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost/management'
mongoose.connect(dbUrl)
var db = mongoose.connection
db.on('error', function(err){
    console.log(err)
})
db.once('open', function(){
    console.log('mongodb is connect on PORT 27017')
})

var app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views/pages'));
app.set('views', './views/pages')
app.set('view engine', 'jade');
app.locals.moment = moment
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookiesession({                           //cokie-session 已经对cookie和session本地持久化做了处理
    name: 'session',
    keys: ['key0','key1'],
}))


// 引入路由

var routes = require('./routes/route')
routes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


module.exports = app
