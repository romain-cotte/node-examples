'use strict';

var should = require('should');// jshint ignore:line

describe('Array', function () {
  var array = [1, 2, 3, 4, 5, 6, 10];
  it('pop', function (done) {
    var p = array.pop();
    p.should.eql(10);
    array.length.should.eql(6);
    done();
  });

  it('unshift', function (done) {
    array.unshift(11);
    array[0].should.eql(11);
    array.length.should.eql(7);
    done();
  });

  it('shift', function (done) {
    var s = array.shift();
    s.should.eql(11);
    array.length.should.eql(6);
    done();
  });

  it('concat', function (done) {
    var r = array.concat([12, 13]);
    array.should.eql([1, 2, 3, 4, 5, 6]);
    r.should.eql([1, 2, 3, 4, 5, 6, 12, 13]);
    done();
  });

  it('splice', function (done) {
    // splice(i, j, v) removes i elements from index j, and inserts v
    var r = array.splice(3, 2, 14);
    r.should.eql([4, 5]);
    array.should.eql([1, 2, 3, 14, 6]);
    r = array.splice(3, 2, 15, 16);
    r.should.eql([14, 6]);
    array.should.eql([1, 2, 3, 15, 16]);
    r = array.splice(-1, 1); // Warning with indexOf returns [16], array : [1, 2, 3, 15]
    r.should.eql([16]);
    array.should.eql([1, 2, 3, 15]);
    array.splice(2, 1);
    array.should.eql([1, 2, 15]);
    done();
  });

});

