import ClassA from '../classes/ClassA.js'
import should from 'should' //eslint-disable-line

describe('ClassA', () => {

  it('default constructor', () => {
    let a = new ClassA()
    a.toString().should.eql('Your string is hello')
    a.toNumber().should.eql(0)
  })

  it('constructor with wrong parameter', () => {
    (() => {
      // Wrong type of arguments
      new ClassA(10, 'aze')
      // Will only throw in test environment
    }).should.throw()
  })

})
