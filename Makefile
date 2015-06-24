test:
	jshint --exclude-path .gitignore .
	mocha

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
