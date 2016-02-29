import _ from 'lodash'
import should from 'should'
import fs from 'fs'
describe('es6 notation', () => {

  it('bracket notation inside object', () => {
    const FOO = 'foo'
    let { [FOO]: f } = { foo: 123 }
    f.should.eql(123)
  })

  it('spread notation', () => {
    const f = (a, b, c) => {
      return a + b + c
    }
    f(...[1, 2, 3]).should.eql(6)
  })

  it('spread notation', () => {
    const a = [4, 5, 6];
    const b = [1, 2, 3, ...a, 7, 8, 9];
    b.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('spread inside object', () => {
    let initial = { prop1: 1, prop2: 2 }
    let obj = { ...initial }
    obj.should.eql(initial)
  })

  it('spread inside object order of appearance', () => {
    let initial = { prop1: 1, prop2: 2 }
    let obj = { ...initial, prop1: 3 }
    obj.prop1.should.eql(3)
    obj = { prop1: 3, ...initial }
    obj.prop1.should.eql(1)
  })

})

