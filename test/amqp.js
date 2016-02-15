import amqplib from 'amqplib';
import should from 'should';

let q = 'tasks';
/**
 * See https://github.com/squaremo/amqp.node
 */
describe('amqp', () => {

  describe('callback api', () => {
    let connection, channel;
    before(done => {
      amqplib.connect('amqp://localhost')
        .then(conn => {
          connection = conn;
          return conn.createChannel()
        })
        .then(chan => {
          channel = chan;
          channel.assertQueue(q);
          should.exist(connection);
          done();
        });
    });

    it('publish and consume a message', (done) => {
      let message = 'message content';
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

