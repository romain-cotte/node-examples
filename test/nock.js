import nock from 'nock';
import rp from 'request-promise';
import should from 'should'; // eslint-disable-line

describe('Nock', () => {

  let url = 'http://test.com';
  before(() => {
    nock(url)
      .post('/users')
      .reply(201, { id: '123456' });
  });

  it('post test', done => {
    const options = {
      url: `${url}/users`,
      method: 'POST',
      headers: { authorization: 'Bearer token' },
      body: {
        username: 'username',
        email: 'test@test.com'
      },
      json: true,
      resolveWithFullResponse: true
    };

    rp(options)
      .then(({ statusCode, body }) => {
        statusCode.should.eql(201);
        body.should.eql({ id: '123456' });
        done();
      })
      .catch(done);
  });

});
