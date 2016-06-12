'use strict'

const should = require('should')

describe('arithmetic', () => {
  /**
   * For all exemples, suppose it's 8-bit signed integer
   * First bit determine if it's negative
   */
  it('shifting', () => {
    const val = 11;          //   1011
    (val>>2).should.eql(2);  //     10
    (val<<2).should.eql(44); // 101100
  })

  it('invert binary', () => {
    const val = 20;         //    10100
    (~val).should.eql(-21); // 11101011
  })

  it('or', () => {
    // Warning : the OR binary is only one pipe
    const val1 = 22;              //    10110
    const val2 = 10;              //     1010
    (val1 | val2).should.eql(30); //    11110
  })

  it('and', () => {
    // Warning the AND binary is only one &
    const val1 = 22;              //    10110
    const val2 = 10;              //     1010
    (val1 & val2).should.eql(2); //        10
  })

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
  it('and has a higher priority than or', () => {
    const val1 = 22;           //    10110
    const val2 = 10;           //     1010
    const val3 =  4;           //      100
    (val1 & val2 | val3)       // 10 | 100
      .should.eql(6);          //      110
    (val2 | val3 & val1)       // 1010 | 100
      .should.eql(14);         //     1110
    (val1 & val2 | val2)       //
      .should.eql(10);         //     1010
  })

  it('^ operand', () => {
    const val1 = 22;     //    10110
    const val2 = 10;     //     1010
    (val1 ^ val2)
      .should.eql(28);   //    11100
  })

})
