var Promise = require('bluebird');// jshint ignore:line

var fs     = Promise.promisifyAll(require('fs'));
var should = require('should');// jshint ignore:line

/**
 * See https://github.com/petkaantonov/bluebird
 */
describe('Bluebird', () => {
  it('should read package.json', done => {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then((json) => {
        json.author.should.eql('Romain Cotte');
        done();
      })
      .catch(SyntaxError,  (/*e*/) => {
        console.error('file contains invalid json');
      })
      .catch(Promise.OperationalError, e => {
        console.error('unable to read file, because: ', e.message);
      });
  });
});

