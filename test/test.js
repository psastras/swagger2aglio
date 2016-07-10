var assert = require('assert');
var swagger2aglio = require('./../index');
var exec = require('child_process').exec;

describe('Swagger documentation generator', function () {

  var petstorePath = './example.yml';

  it('should run with minimal arguments', function (done) {
    swagger2aglio.convert({
      input: petstorePath
    }, function (err, html) {
      assert.ifError(err);
      assert(html);
      done();
    });
  });

  it('should accept theme parameters', function (done) {
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

  describe('command line', function () {

    it('should require an input file to be specified', function (done) {
      exec("node index.js", function (error, stdout, stderr) {
         assert(error);
         assert(stderr);
         done();
      });
    });

    it('should write ouput to a specified file', function (done) {
      exec("node index.js -i " + petstorePath + " -o .test.html", function (error, stdout, stderr) {
         assert.ifError(error);
         done();
      });
    });
    
  });
});