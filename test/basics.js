import _ from 'lodash';
import should from 'should';// jshint ignore:line

describe('Basics', () => {

  it('comparisons', () => {
    /* jshint ignore:start */
    (0 == false).should.be.true;
    (0 === false).should.be.false;
    (1 == '1').should.be.true;
    (1 === '1').should.be.false;
    /* jshint ignore:end */
  });

  it('additions', () => {
    (null + 10).should.eql(10);
  });

  var testCondition = (condition) => {
    if (condition) {
      return true;
    }
    return false;
  };

  it('if conditions', () => {
    testCondition('str').should.be.true;
    testCondition('').should.be.false;
    testCondition(null).should.be.false;
    testCondition(undefined).should.be.false;
  });

  it('object copy same reference: be very careful', () => {
    var obj = { a: 1 };
    var copy = obj;
    copy.a = 2;
    obj.a.should.eql(2);
  });

  it('object real copy', () => {
    var obj = { a: 1 };
    var copy = _.clone(obj);
    copy.a = 2;
    obj.a.should.eql(1);
  });

  it('array copy', () => {
    var array = [ 0 ];
    var copy = array;
    copy.push(1);
    array.length.should.eql(2);
  });

});

