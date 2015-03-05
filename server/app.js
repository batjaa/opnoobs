require('../root');
var express = require('express');
var app = express();

// set up handlebars view engine
var hbs = require('express3-handlebars').create({
  layoutsDir: projpath('server/views/layouts'),
  partialsDir: projpath('server/views/partials'),
  defaultLayout: 'main',
  extname: '.hbs',
});
app.set('views', projpath('server/views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.set('port', process.env.PORT || 3000);

// Public
app.use(express.static(projpath('public')));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about', {
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river');
});

app.get('/tours/request', function(req, res){
  res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function(req, res){ res.type('text/plain');
  res.status(404);
  res.render('404');
});
// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});
