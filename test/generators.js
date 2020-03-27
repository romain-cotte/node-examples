const should = require('should') //eslint-disable-line

function* gen() {
  yield* ['a', 'b', 'c'];
}

describe('Ecmascript 6', () => {

  it('should test class', () => {
    var g = gen();
    g.next().should.eql({ value: 'a', done: false });
    g.next().should.eql({ value: 'b', done: false });
    g.next().should.eql({ value: 'c', done: false });
    g.next().should.eql({ value: undefined, done: true });
  });

});

