'use strict'
const should = require('should') //eslint-disable-line

describe('array', () => {
  let array

  beforeEach(() => {
    array = [1, 2, 3, 4, 5, 6, 7]
  })

  it('pop', () => {
    const p = array.pop()
    p.should.eql(7)
    array.length.should.eql(6)
  })

  it('unshift', () => {
    array.unshift(11)
    array[0].should.eql(11)
    array.length.should.eql(8)
  })

  it('shift', () => {
    const s = array.shift()
    s.should.eql(1)
    array.length.should.eql(6)
  })

  it('concat', () => {
    const r = array.concat([12, 13])
    array.should.eql([1, 2, 3, 4, 5, 6, 7])
    r.should.eql([1, 2, 3, 4, 5, 6, 7, 12, 13])
  })

  it('splice(i, j, v)', () => {
    // splice(i, j, v) removes i elements from index j, and inserts v
    const r = array.splice(3, 2, 14)
    r.should.eql([4, 5])
    array.should.eql([1, 2, 3, 14, 6, 7])
  })

  it('splice(i, j, v, w)', () => {
    const r = array.splice(3, 2, 15, 16)
    r.should.eql([4, 5])
    array.should.eql([1, 2, 3, 15, 16, 6, 7])
  })

  it('splice(-1, 1)', () => {
    // Warning with indexOf returns [16], array : [1, 2, 3, 15]
    const r = array.splice(-1, 1)
    r.should.eql([7])
    array.should.eql([1, 2, 3, 4, 5, 6])
  })

  it('splice(2, 1)', () => {
    const r = array.splice(2, 1)
    array.should.eql([1, 2, 4, 5, 6, 7])
    r.should.eql([3])
  })

})

