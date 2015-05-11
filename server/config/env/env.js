var fs = require('fs')

var env = module.exports = function (app) {
  var environment = app.get('env');
  switch(environment){
    case 'development':
      // compact, colorful dev logging
      app.use(require('morgan')('dev'));
      break;
    case 'production':
      // module 'express-logger' supports daily log rotation
      app.use(require('express-logger')({
        path: __dirname + '/log/requests.log'
      }));
    break;
  }
  fs.readFile(projpath('/server/config/env/' + environment + '.env'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    _.forEach(data.split('\n'), function (line) {
      line = line.replace(/#.*/, '');
      line = _.trim(line).split('=');
      if (!line || line.length < 2) return;
      app.set(line[0], line[1]);
    })
  });
}