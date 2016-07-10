var assert = require('assert');
var swagger2aglio = require('./index');

describe('Swagger documentation generator', function () {
  it ('should run with minimal arguments', function (done) {
    swagger2aglio.convert({
      input: './petstore_expanded.yml'
    }, function (err, html) {
      assert.ifError(err);
      assert(html);
      done();
    });
  });
});