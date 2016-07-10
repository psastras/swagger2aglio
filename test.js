var assert = require('assert');
var swagger2aglio = require('./index');

describe('Swagger documentation generator', function () {

  var petstorePath = './petstore_expanded.yml'; 

  it ('should run with minimal arguments', function (done) {
    swagger2aglio.convert({
      input: petstorePath
    }, function (err, html) {
      assert.ifError(err);
      assert(html);
      done();
    });
  });

  it ('should accept theme parameters', function (done) {
    swagger2aglio.convert({ 
      input: petstorePath,
      themeTemplate: 'triple',
      themeVariables: 'slate',
    }, function (err, html) {
      assert.ifError(err);
      assert(html);
      done();
    });
  });
});