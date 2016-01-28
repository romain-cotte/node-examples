var Promise = require('bluebird');// jshint ignore:line

var fs     = Promise.promisifyAll(require('fs'));
var should = require('should');// jshint ignore:line

/**
 * See https://github.com/petkaantonov/bluebird
 */
describe('Bluebird', function () {
  it('should read package.json', function (done) {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then(function (json) {
        json.author.should.eql('Romain Cotte');
        done();
      })
      .catch(SyntaxError, function (/*e*/) {
        console.error('file contains invalid json');
      })
      .catch(Promise.OperationalError, function (e) {
        console.error('unable to read file, because: ', e.message);
      });
  });
});

