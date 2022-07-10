const Promise = require('bluebird');
const redis = require('redis');
const { expect } = require('chai');

Promise.promisifyAll(redis);

describe('Redis', () => {
  let client;
  before(() => {
    client = redis.createClient({
      url: 'redis://localhost:6379'
    });
    client.on('error', err => {
      console.log('Error', err) //eslint-disable-line
    });
  });
  after(() => client.quit());

  beforeEach(() => client.flushdb());

  it('set - get', async () => {
    const key = 'key', value = 'value';
    const res = await client.setAsync(key, value);
    expect(res).to.eql('OK');
    const result = await client.getAsync(key);
    expect(result).to.eql(value);
  });

  it('incr', async () => {
    let key = 'key0', value = 1;
    await client.setAsync(key, value);
    const result = await client.incrAsync(key);
    expect(result).to.eql(++value);
  });

  it('should delete a key', async () => {
    const key = 'key';
    const value = 'value';
    await client.setAsync(key, value);
    await client.delAsync(key);
    const res = await client.getAsync(key);
    expect(res).to.eql(null);
  });

  it('first incr', async () => {
    const key = 'key1';
    await client.delAsync(key);
    const res = await client.incrAsync(key);
    expect(res).to.eql(1);
  });

  it('storing hash', async () => {
    const key = 'key 0';
    await client.delAsync(key);
    let res = await client.hsetAsync(key, 'property', 'value');
    expect(res).to.eql(1);
    res = await client.hkeysAsync(key);
    expect(res).to.eql(['property']);
    res = await client.hgetallAsync(key);
    expect(res).to.eql({ property: 'value' });
  });

  it('storing hash', async () => {
    const key = 'key A';
    const obj = {
      property1: 'value1',
      property2: 'value2',
      property3: 'value3'
    };
    let res = await client.hmsetAsync([
      key,
      'property1', 'value1',
      'property2', 'value2',
      'property3', 'value3'
    ]);
    res = await client.hgetallAsync(key);
    expect(res).to.eql(obj);
  });

  describe('storing nested object', () => {
    const key = 'key B';
    const obj = {
      key1: 'value1',
      key2: { subKey: 'value2' },
      key3: { subKey: new Date().getTime() }
    };

    it('hmset does not overwrite other properties', async () => {
      const object = { startingProp1: 1, startingProp2: 2 };
      await client.delAsync(key);
      let res = await client.hmsetAsync(key, object);
      expect(res).to.eql('OK');
      res = await client.hmsetAsync(key, { nextProp1: 3, nextProp2: 4 });
      expect(res).to.eql('OK');
      res = await client.hgetallAsync(key);
      expect(res).to.eql({
        startingProp1: '1',
        startingProp2: '2',
        nextProp1: '3',
        nextProp2: '4',
      });
    });

  });

  it('delete hset', async () => {
    await client.hsetAsync('a:0', 'b', 1);
    const del = await client.delAsync('a:0');
    const all = await client.hgetallAsync('a:0');
    expect(all).to.eql(null);
    expect(del).to.eql(1);
  });

  it('delete wildcard', async () => {
    await client.hsetAsync('a', 'b', 1);
    await client.delAsync('a');
    const r = await client.hgetAsync('a', 'b');
    expect(r).to.eql(null);
  });

  it('rpush', done => {
    client.rpush('key', '{"a": "b"}', (err, res) => {
      // console.log('err:', err)
      // console.log('res:', res)
      expect(res).to.eql(1);
      done();
    });
  });

});
