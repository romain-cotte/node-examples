import Promise from 'bluebird';
import _fs from 'fs';
import should from 'should';
const fs = Promise.promisifyAll(_fs);

/**
 * See https://github.com/petkaantonov/bluebird
 */
describe('bluebird', () => {
  it('should read package.json', done => {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then((json) => {
        json.author.should.eql('Romain Cotte');
        done();
      })
      .catch(SyntaxError,  () => {
        console.error('file contains invalid json');
      })
      .catch(Promise.OperationalError, e => {
        console.error('unable to read file, because: ', e.message);
      });
  });
});

