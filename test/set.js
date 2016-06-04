'use strict'

const _ = require('lodash')
const should = require('should') //eslint-disable-line

describe('Set', () => {
  let s;
  beforeEach(() => {
    s = new Set();
  })

  it('add element', () => {
    s.add(10);
    s.size.should.eql(1);
  })

  it('check element', () => {
    s.add(10);
    s.has(10).should.be.true();
  })

  it('delete element', () => {
    s.add(10);
    s.delete(10);
    s.has(10).should.be.false();
  })

  it('define several element at once', () => {
    s = new Set([1, 2, 3, 4]);
    s.size.should.eql(4)
    // [...s].should.eql([1, 2, 3, 4])
  })

})

