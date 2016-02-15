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

  const testCondition = condition => {
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
    const obj = { a: 1 };
    const copy = obj;
    copy.a = 2;
    obj.a.should.eql(2);
  });

  it('object real copy', () => {
    const obj = { a: 1 };
    const copy = _.clone(obj);
    copy.a = 2;
    obj.a.should.eql(1);
  });

  it('array copy', () => {
    const array = [ 0 ];
    const copy = array;
    copy.push(1);
    array.length.should.eql(2);
  });

});

