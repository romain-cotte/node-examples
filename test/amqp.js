'use strict';

// var amqplib   = require('amqplib');
var amqplib_c = require('amqplib/callback_api');
var async     = require('async');
var should    = require('should');

var q = 'tasks';

/**
 * See https://github.com/squaremo/amqp.node
 */
describe('Amqp lib', function () {
  describe('callback api', function () {
    var connection, channel;
    before(function (done) {
      async.waterfall([
        function (next) {
          amqplib_c.connect('amqp://localhost', next);
        },
        function (conn, next) {
          connection = conn;
          connection.createChannel(next);
        }
      ], function (err, ch) {
        should.not.exist(err);
        channel = ch;
        channel.assertQueue(q);
        done();
      });
    });

    it('publish and consume a message', function (done) {
      var message = 'message content';
      channel.sendToQueue(q, new Buffer(message));
      channel.consume(q, function (msg) {
        console.log('message content:', msg.content.toString());
        msg.content.toString().should.eql(message);
        channel.ack(msg); // Message will stay in the queue if not executed
        done();
      });
    });

  });
});
