require('../root');

var express = require('express');
var path = require('path');

var config = prequire('server/config/config');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
config(app);

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});
