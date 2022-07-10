import should from 'should';
import Stream from 'stream';

describe('Stream', () => {
  let cnt = 0;
  const readable = new Stream.Readable({
    objectMode: true,
    async read() {
      if (++cnt <= 5) {
        this.push(cnt);
      } else {
        this.push(null);
      }
    }
  });

  it('should write from a readable stream', done => {
    let results = [];
    let writable = new Stream.Writable({
      objectMode: true,
      write(chunk, enc, next) {
        results.push(chunk);
        next();
      }
    });
    Stream.pipeline(readable, writable, (err) => {
      should.not.exist(err);
      results.should.eql([ 1, 2, 3, 4, 5]);
      done();
    });
  });
});
