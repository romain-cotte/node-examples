// var amqplib   = require('amqplib');
var amqplib_c = require('amqplib/callback_api');
var async     = require('async');
var should    = require('should');

var q = 'tasks';

/**
 * See https://github.com/squaremo/amqp.node
 */
describe('Amqp lib', () => {
  describe('callback api', () => {
    var connection, channel;
    before((done) => {
      async.waterfall([
        (next) => {
          amqplib_c.connect('amqp://localhost', next);
        },
        (conn, next) => {
          connection = conn;
          connection.createChannel(next);
        }
      ], (err, ch) => {
        should.not.exist(err);
        channel = ch;
        channel.assertQueue(q);
        done();
      });
    });

    it('publish and consume a message', (done) => {
      var message = 'message content';
      channel.sendToQueue(q, new Buffer(message));
      channel.consume(q, (msg) => {
        console.log('message content:', msg.content.toString());
        msg.content.toString().should.eql(message);
        channel.ack(msg); // Message will stay in the queue if not executed
        done();
      });
    });

  });
});
