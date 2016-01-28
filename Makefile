test: redis-flush
	mocha --harmony

redis-flush:
	redis-cli flushall

arithmetic:
	mocha test/arithmetic.js

array:
	mocha test/array.js

async:
	mocha test/async.js

bluebird:
	mocha test/bluebird.js

fs:
	mocha test/fs.js

redis:
	mocha test/redis.js

time:
	mocha test/time.js

.PHONY: bluebird test
