'use strict';

const should = require('should') //eslint-disable-line

describe('Set', () => {
  let set;
  beforeEach(() => {
    set = new Set();
  });

  it('add element', () => {
    set.add(10);
    set.size.should.eql(1);
  });

  it('check element', () => {
    set.add(10);
    set.has(10).should.be.true();
  });

  it('delete element', () => {
    set.add(10);
    set.delete(10);
    set.has(10).should.be.false();
  });

  it('define several element at once', () => {
    set = new Set([1, 2, 3, 4]);
    set.size.should.eql(4);
    // [...set].should.eql([1, 2, 3, 4])
  });

  it('iterate through set', () => {
    const initialArray = [1, 2, 3, 4];
    set = new Set(initialArray);
    let array = [];
    for (let item of set) {
      array.push(item);
    }
    array.should.eql(initialArray);
    Array.from(set).should.eql(initialArray);
  });

});

