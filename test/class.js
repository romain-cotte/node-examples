import A from '../classes/A.js'
import B from '../classes/B.js'
import should from 'should' //eslint-disable-line

describe('Class', () => {

  it('default constructor', () => {
    const a = new A()
    a.toString().should.eql('Your string is hello')
    a.toNumber().should.eql(0)
  })

  it('constructor with wrong parameter', () => {
    (() => {
      // Wrong type of arguments
      new A(10, 'aze')
      // Will only throw in test environment
    }).should.throw()
  })

  it('static method', () => {
    A.staticMethod('abcd').should.eql('[abcd]')
  })

  it('inheritance', () => {
    const b = new B()
    b.toString().should.eql('Inside B, your string is hello')
    b.should.be.an.instanceOf(A)
    b.should.be.an.instanceOf(B)
  })

})
