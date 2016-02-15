import crypto from 'crypto';
import should from 'should';

describe('crypto', () => {

  it('md5 encryption', () => {
    const data = '123456';
    crypto.createHash('md5')
          .update(data)
          .digest('hex')
          .should.eql('e10adc3949ba59abbe56e057f20f883e');
  });

});
