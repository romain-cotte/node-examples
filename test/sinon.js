import sinon from 'sinon';
import should from 'should' //eslint-disable-line

describe('Sinon', () => {

  describe('Sync function', () => {
    let f;
    beforeEach(() => { f = { incr: i => i + 1 }; });

    it('f', () => {
      f.incr(1).should.eql(2);
    });

    it('stub the function', () => {
      const stub = sinon.stub(f, 'incr').callsFake(i => i + 3);
      f.incr(1).should.eql(4);
      sinon.assert.calledOnce(stub);
      stub.restore(); // could be f.incr.restore()
    });

    it('mock the function', () => {
      const mock = sinon.mock(f);
      const expectation = mock.expects('incr');
      should.not.exist(f.incr(1));
      expectation.once();
      expectation.verify();
      mock.restore();
    });

    it('spy the function', () => {
      const spy = sinon.spy(f, 'incr');
      f.incr(10).should.eql(11);
      spy.withArgs(10).calledOnce.should.be.true();
      spy.restore();
    });
  });

});
