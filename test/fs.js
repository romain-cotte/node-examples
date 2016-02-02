var async  = require('async'); // jshint ignore:line
var fs     = require('fs');
var should = require('should');

describe('fs', () => {

  it('writeFile', (done) => {
    fs.writeFile('test/tmp/fs-writeFile.txt', 'Hello Node', (err) => {
      should.not.exist(err);
      done();
    });
  });

});
