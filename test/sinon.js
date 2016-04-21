'use strict'

const sinon = require('sinon')
const should = require('should')

const f = {
  incr: i => i + 1
}

describe('Sinon', () => {

  it('f', () => {
    f.incr(1).should.eql(2)
  })

  it('stub the function', () => {
    let stub = sinon.stub(f, 'incr', i => i + 3)
    f.incr(1).should.eql(4)
    stub.restore() // could be f.incr.restore()
  })

  it('mock the function', () => {
    let mock = sinon.mock(f)
    let expectation = mock.expects('incr');
    f.incr(1);
    expectation.calledOnce.should.be.true()
  })

})
