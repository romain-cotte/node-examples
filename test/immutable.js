/**
 * See https://facebook.github.io/immutable-js/
 */
import should from 'should' //eslint-disable-line
import Immutable from 'immutable';

describe('immutable', () => {

  it('map', () => {
    const map1 = Immutable.Map({ a:1, b:2, c:3 });
    const map2 = map1.set('b', 10);
    map1.get('b').should.eql(2);
    map2.get('b').should.eql(10)
    ;(map1.equals(map2)).should.be.false();
  });

  it('list', () => {
    const list1 = Immutable.List.of(1, 2);
    const list2 = list1.push(3, 4, 5);
    list1.size.should.eql(2);
    list2.size.should.eql(5);
  });

  it('get', () => {
    const list1 = Immutable.List.of(1, 3, 7, 10);
    list1.getIn([3]).should.eql(10);
    const map = Immutable.Map({ a:1, b:2, c:3 });
    map.get('b').should.eql(2);
  });

});
