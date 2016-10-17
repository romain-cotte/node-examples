'use strict'

const amqplib = require('amqplib')
const should = require('should')

let queue = 'tasks'
/**
 * See https://github.com/squaremo/amqp.node
 */
describe('amqp', () => {

  let connection, channel
  let queue1 = 'q1', queue2 = 'q2'
  before(() => {
    // Connection to RabbitMQ server
    return amqplib.connect('amqp://localhost')
      .then(conn => {
        connection = conn
        return conn.createChannel()
      })
      .then(chan => {
        channel = chan
        return channel.assertQueue(queue1)
      })
      .then(() => channel.assertQueue(queue2))
      .then(() => {
        should.exist(connection)
        return channel.purgeQueue(queue1)
      })
      .then(() => {
        return channel.purgeQueue(queue2)
      })
  })

  after(() => {
    connection.close()
  })

  beforeEach(() => {
    return channel.purgeQueue(queue1)
      .then(() => channel.purgeQueue(queue2))
  })

  it('send a message and consume it, 1 "Hello world" example', done => {
    let message = 'message content'
    channel.consume(queue1, msg => {
      msg.content.toString().should.eql(message)
      // Message will stay in the queue if ack is not executed
      channel.ack(msg)
      done()
    })
    channel.sendToQueue(queue1, new Buffer(message))
  })

  it('send a message and nack it, retry 5 times', done => {
    let message = { key: 'message content' }
    channel.consume(queue2, msg => {
      let msgObj = JSON.parse(msg.content.toString())
      msgObj.should.eql(message)

      let count = msg.properties.headers['x-redeliverd-count']
      if (!count) {
        msg.properties.headers['x-redeliverd-count'] = 1
      } else {
        msg.properties.headers['x-redeliverd-count']++
      }

      if (msg.properties.headers['x-redeliverd-count'] >= 5) {
        console.log('null +', null)
        channel.ack(msg)
        return done()
      }

      channel.sendToQueue(queue2, msg.content, { headers: msg.properties.headers })
      channel.ack(msg, false, true)
    })

    channel.sendToQueue(queue2, new Buffer(JSON.stringify(message)))
  })

})

