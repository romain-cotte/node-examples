'use strict';

var crypto = require('crypto');
var should = require('should'); // jshint ignore:line

describe('crypto', function () {

  it('md5 encryption', function () {
    var data = '123456';
    crypto.createHash('md5')
          .update(data)
          .digest('hex')
          .should.eql('e10adc3949ba59abbe56e057f20f883e');
  });

});
