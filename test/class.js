import A from '../classes/A.js';
import B from '../classes/B.js';
import C from '../classes/C.js';

import staticA from '../classes/StaticA.js';
import should from 'should' //eslint-disable-line

describe('Class', () => {

  it('default constructor', () => {
    const a = new A();
    a.toString().should.eql('Your string is hello');
    a.toNumber().should.eql(0);
  });

  // Only with flow typing
  // it('constructor with wrong parameter', () => {
  //   (() => {
  //     // Wrong type of arguments
  //     new A(10, 'aze')
  //     // Will only throw in test environment
  //   }).should.throw()
  // })

  it('static method', () => {
    A.staticMethod('abcd').should.eql('[abcd]');
  });

  it('static property', () => {
    A.prop.should.eql('prop');
  });

  it('inheritance', () => {
    const b = new B();
    b.toString().should.eql('Inside B, your string is hello');
    b.should.be.an.instanceOf(A);
    b.should.be.an.instanceOf(B);
  });

  it('super method', () => {
    const b = new B();
    b.toStringFromSuper().should.eql('Your string is hello!!!');
  });

  it('Symbol.iterator method', () => {
    const b = new B();
    const result = [];
    for (let x of b) {
      result.push(x);
    }
    result.should.eql([1, 2, 3]);
  });

  it('Symbol iterator method', () => {
    const c = new C(1, 2, 3, 4);
    const result = [];
    for (let x of c) {
      result.push(x);
    }
    result.should.eql([1, 2, 3, 4]);
  });

  it('newInstance from staticMethod', () => {
    const a = A.newInstance();
    a.toString().should.eql('Your string is from newInstance');
  });

  it('static class', () => {
    staticA.toString().should.eql('Your string is from static class');
  });

});
