'use strict'

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');

const should = require('should') //eslint-disable-line
const PORT = 41234

describe('UDP', () => {
  let _message

  before(() => {
    server.on('listening', () => {
      const address = server.address();
    });

    server.bind(41234);
  })

  it('Send udp', done => {
    const str = 'Some bytes'
    const message = Buffer.from(str)

    server.on('message', (msg, rinfo) => {
      msg.toString().should.eql(str)
      done()
    });

    client.send(message, 41234, 'localhost', err => {
      client.close();
    })
  })

})

