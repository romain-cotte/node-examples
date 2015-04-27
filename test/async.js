var async   = require('async');
var should  = require('should');

describe('Async', function () {
  it('waterfall', function(done) {
    async.waterfall([
      function (next) {
        next(null, 'one', 'two');
      },
      function (arg1, arg2, next) {
        arg1.should.eql('one');
        arg2.should.eql('two');
        // arg1 now equals 'one' and arg2 now equals 'two'
        next(null, 'done');
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql('done');
      done();
    });
  });




  it('error', function (done) {
    async.waterfall([
      function (next) {
        // notDefined.id;
        /* Throw an error here */
        next(null, 'result');
      },
    ], function (err, result) {
      should.not.exist(err);
      done();
    });
  });






  // it('async process.nextTick', function (done) {
  //   async.series([
  //     function (callback) {
  //       console.log(0);
  //       process.nextTick(callback);
  //     },
  //     function (callback) {
  //       console.log(1);
  //       callback(null);
  //     }
  //   ], function (err, results) {
  //     should.not.exist(err);
  //     done();
  //   });
  //   console.log('a');
  //   -> 0 a 1
  // });

});

