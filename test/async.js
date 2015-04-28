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

  it('parallel', function(done) {
    async.parallel([
      function (next) {
        next(null, 'one');
      },
      function (next) {
        next(null, 'two');
      }
    ], function(err, results) { // Optional
      var arg2 = results.pop();
      var arg1 = results.pop();
      arg1.should.eql('one');
      arg2.should.eql('two');
      done();
    });
  });

  it('series', function(done) {
    async.series([
      function (callback) {
        callback(null, 'one');
      },
      function (callback) {
        callback(null, 'two');
      }
    ], function (err, results) {
      var arg2 = results.pop();
      var arg1 = results.pop();
      arg1.should.eql('one');
      arg2.should.eql('two');
      done();
    });
  });

  it('map', function(done) {
    var AsyncSquaringLibrary = {
      squareExponent: 2,
      square: function(number, callback){
        var result = Math.pow(number, this.squareExponent);
        setTimeout(function(){
          callback(null, result);
        }, 200);
      }
    };

    async.map([1, 2, 3],
              AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary),
              function(err, result){
      should.not.exist(err);
      result.should.eql([1, 4, 9]);
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

