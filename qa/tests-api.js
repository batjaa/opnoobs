var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

suite('API tests', function () {
  var base = 'http://localhost:3000';
  test('should be passing', function(done){
    var toEcho = {
      result: 200,
      resultStr: 'testStr'
    };
    rest.json(base+'/api/echo', toEcho).on('success', function (data) {
      assert.deepEqual(data, toEcho, 'must be equal');
      done();
    });
  });
})