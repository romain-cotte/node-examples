'use strict'

const should = require('should') //eslint-disable-line

describe('Map', () => {
  let map
  beforeEach(() => {
    map = new Map()
  })

  it('add element', () => {
    map.set(1, 'element1')
    map.size.should.eql(1)
  })

  it('add element on the same key', () => {
    map.set(1, 'element1')
    map.set(1, 'element2') // override
    map.get(1).should.eql('element2')
  })

})
