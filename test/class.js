import ClassA from '../classes/ClassA.js'
import should from 'should' //eslint-disable-line

describe('ClassA', () => {

  it('constructor', () => {
    let a = new ClassA()
    a.toString().should.eql('Your string is hello')
    a.toNumber().should.eql(0)
  })

})
