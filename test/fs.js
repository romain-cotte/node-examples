'use strict';

var async  = require('async');
var fs     = require('fs');
var should = require('should');

describe('fs', function () {

  it('writeFile', function (done) {
    fs.writeFile('test/tmp/fs-writeFile.txt', 'Hello Node', function (err) {
      should.not.exist(err);
      done();
    });
  });

});
