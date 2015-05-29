'use strict';

var should = require('should');// jshint ignore:line

describe('Basics', function () {

  it('comparisons', function () {
    /* jshint ignore:start */
    (0 == false).should.be.true;
    (0 === false).should.be.false;
    (1 == '1').should.be.true;
    (1 === '1').should.be.false;
    /* jshint ignore:end */
  });

  it('additions', function () {
    (null + 10).should.eql(10);
  });

});

