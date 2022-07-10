import redis from 'redis';
import { expect } from 'chai';

describe('Redis', () => {
  let client;
  before(async () => {
    client = redis.createClient({
      url: 'redis://localhost:6379'
    });
    client.on('error', err => {
      console.log('Error', err) //eslint-disable-line
    });
    await client.connect();
  });
  after(() => client.quit());
  beforeEach(() => client.flushDb());

  it('set - get', async () => {
    const key = 'key', value = 'value';
    const res = await client.set(key, value);
    expect(res).to.eql('OK');
    const result = await client.get(key);
    expect(result).to.eql(value);
  });

  it('incr', async () => {
    let key = 'key0', value = 1;
    await client.set(key, value);
    const result = await client.incr(key);
    expect(result).to.eql(++value);
  });

  it('should delete a key', async () => {
    const key = 'key';
    const value = 'value';
    await client.set(key, value);
    await client.del(key);
    const res = await client.get(key);
    expect(res).to.eql(null);
  });

  it('first incr', async () => {
    const key = 'key1';
    await client.del(key);
    const res = await client.incr(key);
    expect(res).to.eql(1);
  });

  it('storing hash', async () => {
    const key = 'key 0';
    await client.del(key);
    let res = await client.HSET(key, 'property', 'value');
    expect(res).to.eql(1);
    res = await client.HKEYS(key);
    expect(res).to.eql(['property']);
    res = await client.HGETALL(key);
    expect(res).to.eql({ property: 'value' });
  });

  it('storing hash', async () => {
    const key = 'key A';
    const obj = {
      property1: 'value1',
      property2: 'value2',
      property3: 'value3'
    };
    let res = await client.HSET(
      key,
      {
        'property1': 'value1',
        'property2': 'value2',
        'property3': 'value3'
      }
    );
    res = await client.HGETALL(key);
    expect(res).to.eql(obj);
  });

  describe('storing nested object', () => {
    const key = 'key B';
    const obj = {
      key1: 'value1',
      key2: { subKey: 'value2' },
      key3: { subKey: new Date().getTime() }
    };

    it('HSET does not overwrite other properties', async () => {
      const object = { startingProp1: 1, startingProp2: 2 };
      await client.del(key);
      let res = await client.HSET(key, object);
      expect(res).to.eql(2);
      res = await client.HSET(key, { nextProp1: 3, nextProp2: 4 });
      expect(res).to.eql(2);
      res = await client.HGETALL(key);
      expect(res).to.eql({
        startingProp1: '1',
        startingProp2: '2',
        nextProp1: '3',
        nextProp2: '4',
      });
    });

  });

  it('delete HSET', async () => {
    await client.HSET('a:0', 'b', 1);
    const del = await client.del('a:0');
    const all = await client.HGETALL('a:0');
    expect(all).to.eql({});
    expect(del).to.eql(1);
  });

  it('delete wildcard', async () => {
    await client.HSET('a', 'b', 1);
    await client.del('a');
    const r = await client.HGET('a', 'b');
    expect(r).to.eql(null);
  });

  it('rpush', async () => {
    const r = await client.RPUSH('key', '{"a": "b"}')
    expect(r).to.eql(1)
    const s = await client.LRANGE('key', 0, -1)
    expect(s).to.eql(['{"a": "b"}'])
  });

});
