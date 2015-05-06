EchoController = module.exports = function (rest) {
  rest.get('/echo', function(req, content, callback){
    callback(null, content);
  });
};
