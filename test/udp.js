const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');

const should = require('should') //eslint-disable-line
const PORT = 41234;

describe.skip('UDP', () => {

  before(() => {
    server.on('listening', () => {
      /*const address =*/ server.address();
    });
    server.bind(PORT);
  });

  it('Send udp', done => {
    const str = 'Some bytes';
    const message = Buffer.from(str);

    server.on('message', (msg, _rinfo) => {
      msg.toString().should.eql(str);
      done();
    });

    client.send(message, PORT, 'localhost', _err => {
      client.close();
    });
  });

});

