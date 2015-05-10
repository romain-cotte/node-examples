var should = require('should');

describe('Basics', function () {

  it('comparisons', function () {
   (0 == false).should.be.true;
   (0 === false).should.be.false;
   (1 == "1").should.be.true;
   (1 === "1").should.be.false;
  });

  it('additions', function () {
    (null + 10).should.eql(10);
  });

});
