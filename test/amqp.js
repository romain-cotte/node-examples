const amqplib = require('amqplib');
const Promise = require('bluebird');
const should = require('should');

describe('amqp', () => {

  let shared = {
    queue1: 'q1',
    queue2: 'q2',
    connection: null,
    channel: null,
  };

  before(async () => {
    // Connection to RabbitMQ server
    shared.connection = await amqplib.connect('amqp://localhost');
    should.exist(shared.connection);
    shared.channel = await shared.connection.createChannel();
    await shared.channel.assertQueue(shared.queue1);
    await shared.channel.assertQueue(shared.queue2);
  });

  after(() => shared.connection.close());

  beforeEach(() => Promise.all([
    shared.channel.purgeQueue(shared.queue1),
    shared.channel.purgeQueue(shared.queue2)
  ]));

  it('send a message and consume it, 1 "Hello world" example', done => {
    let message = 'message content';
    shared.channel.consume(shared.queue1, msg => {
      msg.content.toString().should.eql(message);
      // Message will stay in the queue if ack is not executed
      shared.channel.ack(msg);
      done();
    });
    shared.channel.sendToQueue(shared.queue1, new Buffer(message));
  });

  it('send a message and nack it, retry 5 times', done => {
    let message = { key: 'message content' };
    shared.channel.consume(shared.queue2, msg => {
      let msgObj = JSON.parse(msg.content.toString());
      msgObj.should.eql(message);

      let count = msg.properties.headers['x-redeliverd-count'];
      if (!count) {
        msg.properties.headers['x-redeliverd-count'] = 1;
      } else {
        msg.properties.headers['x-redeliverd-count']++;
      }

      if (msg.properties.headers['x-redeliverd-count'] >= 5) {
        shared.channel.ack(msg);
        return done();
      }

      shared.channel.sendToQueue(shared.queue2, msg.content, { headers: msg.properties.headers });
      shared.channel.ack(msg, false, true);
    });

    shared.channel.sendToQueue(shared.queue2, new Buffer(JSON.stringify(message)));
  });

});

