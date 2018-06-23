'use strict';

const should = require('should') //eslint-disable-line

describe('object', () => {

  it('hasOwnPropertyon an object', () => {
    const buz = { fog: 'stack' };
    const hasOwnProperty = [];
    const others = [];
    for (let name in buz) {
      if (buz.hasOwnProperty(name)) {
        hasOwnProperty.push(name);
      } else {
        others.push(name);
      }
    }
    hasOwnProperty.should.eql(['fog']);
    others.should.eql([]);
  });

  it('hasOwnProperty on a class', () => {
    function ClassA() {}
    ClassA.prototype.func = () => {};
    ClassA.prop = 10;

    const result = [];
    for (let name in ClassA) {
      result.push(name);
    }
    result.should.eql(['prop']);
  });

  it('deep equal', () => {
    const obj = { a: { b: { c: 1 } } };
    obj.should.eql({ a: { b: { c: 1 } } });
  });

});
