'use strict';

const amqplib = require('amqplib')
const should = require('should')

let queue = 'tasks'
/**
 * See https://github.com/squaremo/amqp.node
 */
describe('amqp', () => {

  let connection, channel
  before(done => {
    // Connection to RabbitMQ server
    amqplib.connect('amqp://localhost')
      .then(conn => {
        connection = conn
        return conn.createChannel()
      })
      .then(chan => {
        channel = chan
        channel.assertQueue(queue)
        should.exist(connection)
        done()
      })
  })

  after(() => {
    connection.close()
  })

  it('send a message and consume it, 1 "Hello world" example', done => {
    let message = 'message content'
    channel.sendToQueue(queue, new Buffer(message))
    channel.consume(queue, msg => {
      msg.content.toString().should.eql(message)
      // Message will stay in the queue if ack is not executed
      channel.ack(msg)
      done()
    })
  })

})

