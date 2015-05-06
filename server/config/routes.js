var rest = require('connect-rest');

var EchoController = prequire('server/controllers/EchoController');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  // app.get('/api/test', function (req, res) {
  //   res.json({result: true});
  // });

  // API configuration
  var apiOptions = {
    context: '/api',
    domain: require('domain').create(),
  };

  apiOptions.domain.on('error', function(err){
    console.log('API domain error.\n', err.stack);
    setTimeout(function(){
      console.log('Server shutting down after API domain error.');
      process.exit(1);
    }, 5000);
    server.close();
    var worker = require('cluster').worker;
    if(worker) worker.disconnect();
  });

  app.use(rest.rester(apiOptions));

  EchoController(rest);
};
