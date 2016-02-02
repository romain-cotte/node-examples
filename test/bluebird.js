import Promise from 'bluebird';
var fs = Promise.promisifyAll(require('fs'));
import should from 'should';

/**
 * See https://github.com/petkaantonov/bluebird
 */
describe('Bluebird', () => {
  it('should read package.json', done => {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then((json) => {
        json.author.should.eql('Romain Cotte');
        done();
      })
      .catch(SyntaxError,  (/*e*/) => {
        console.error('file contains invalid json');
      })
      .catch(Promise.OperationalError, e => {
        console.error('unable to read file, because: ', e.message);
      });
  });
});

