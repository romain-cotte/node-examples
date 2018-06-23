const should = require('should'); // eslint-disable-line

describe('Promise', () => {

  it('new Promise', done => {
    let p = new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(10);
      }, 30);
    });
    p.then(res => {
      res.should.eql(10);
      done();
    });
  });

  it('shortcut', done => {
    Promise.resolve(10)
      .then(r => {
        r.should.eql(10);
        done();
      });
  });

  it('throw error', done => {
    Promise.resolve()
      .then(() => {
        throw new Error('error');
      })
      .catch(() => {
        done();
      });
  });

});
