test: redis-flush
	jshint --exclude-path .gitignore .
	mocha

<<<<<<< Updated upstream
redis-flush:
	redis-cli flushall
=======
arithmetic:
	mocha test/arithmetic.js
>>>>>>> Stashed changes

array:
	mocha test/array.js

async:
	mocha test/async.js

bluebird:
	mocha test/bluebird.js

fs:
	mocha test/fs.js

time:
	mocha test/time.js

.PHONY: bluebird test
