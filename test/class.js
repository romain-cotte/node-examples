import ClassA from '../classes/ClassA.js'
import should from 'should' //eslint-disable-line

describe('ClassA', () => {

  it('default constructor', () => {
    let a = new ClassA()
    a.toString().should.eql('Your string is hello')
    a.toNumber().should.eql(0)
  })

  it('constructor with wrong parameter', () => {
    (function(){
      // Wrong type of arguments
      let a = new ClassA(10, 'aze')
    }).should.throw();
  })

})
