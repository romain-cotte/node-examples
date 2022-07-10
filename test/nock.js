import nock from 'nock';
import should from 'should'; // eslint-disable-line
import https from 'https';


describe('Nock', () => {

  let url = 'https://test.com';
  before(() => {
    nock(url)
      .post('/users')
      .reply(200, { id: '123456' });
  });

  it('post test', done => {
    const data = JSON.stringify({
      username: 'username',
      email: 'test@test.com'
    });
    const options = {
      hostname: 'test.com',
      port: 443,
      path: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, res => {
      res.statusCode.should.eql(200);

      res.on('data', d => {
        d.toString().should.eql('{"id":"123456"}');
        done();
      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.write(data);
    req.end();



    // const options = {
    //   url: `${url}/users`,
    //   method: 'POST',
    //   headers: { authorization: 'Bearer token' },
    //   body: {
    //     username: 'username',
    //     email: 'test@test.com'
    //   },
    //   json: true,
    //   resolveWithFullResponse: true
    // };

    // rp(options)
    //   .then(({ statusCode, body }) => {
    //     statusCode.should.eql(201);
    //     body.should.eql({ id: '123456' });
    //     done();
    //   })
    //   .catch(done);
  });

});
