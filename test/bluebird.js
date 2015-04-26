'use strict';

var Promise = require('bluebird');

var should  = require('should');
var fs = Promise.promisifyAll(require('fs'));

describe('Bluebird', function() {
  it('should read package.json', function(done) {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then(function (json) {
        json.author.should.eql('Romain Cotte');
        done();
      })
      .catch(SyntaxError, function (e) {
        console.error('file contains invalid json');
      })
      .catch(Promise.OperationalError, function (e) {
        console.error('unable to read file, because: ', e.message);
      });
  });
});

