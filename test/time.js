const should = require('should'); // jshint ignore:line
const moment = require('moment');

describe('Time', function () {
  const date = new Date(2015, 5, 1, 15, 10, 45, 153);
  it('string', function () {
    /**
     * Adjust format: see https://docs.adjust.com/en/event-tracking/#reference-server-side-event-tracking
     */
    moment(date).format('YYYY-MM-DDThh:mm:ss[Z]ZZ')
                .should.eql('2015-06-01T03:10:45Z+0200');
  });

});
