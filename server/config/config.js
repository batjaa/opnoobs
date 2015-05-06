var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = prequire('/server/config/routes.js');

module.exports = function(app){
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  app.set('port', process.env.PORT || 3000);

  app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
  });

  app.use('/api', require('cors')());

  routes(app);

  // custom 404 page
  app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
  });
  // custom 500 page
  app.use(function(err, req, res, next){
    res.type('text/plain');
    console.error(err.stack);
    res.status(500);
  });
};