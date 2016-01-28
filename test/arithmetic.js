var should = require('should');// jshint ignore:line

describe('Arithmetic', function () {
  /**
   * For all exemples, suppose it's 8-bit signed integer
   * First bit determine if it's negative
   */
  it('shifting', function () {
    var val = 11;            //   1011
    (val>>2).should.eql(2);  //     10
    (val<<2).should.eql(44); // 101100
  });

  it('invert binary', function () {
    var val = 20;           //    10100
    (~val).should.eql(-21); // 11101011
  });

  it('or', function () {
    // Warning : the OR binary is only one pipe
    var val1 = 22;                //    10110
    var val2 = 10;                //     1010
    (val1 | val2).should.eql(30); //    11110
  });

  it('and', function () {
    // Warning the or binary is only one &
    var val1 = 22;                //    10110
    var val2 = 10;                //     1010
    (val1 & val2).should.eql(2); //        10
  });

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
  it('and has a higher priority than or', function () {
    var val1 = 22;             //    10110
    var val2 = 10;             //     1010
    var val3 =  4;             //      100
    (val1 & val2 | val3)       // 10 | 100
      .should.eql(6);          //      110
    (val2 | val3 & val1)       // 1010 | 100
      .should.eql(14);         //     1110
    (val1 & val2 | val2)       //
      .should.eql(10);         //     1010
  });

  it('^ operand', function () {
    var val1 = 22;       //    10110
    var val2 = 10;       //     1010
    (val1 ^ val2)
      .should.eql(28);   //    11100
  });


});
