bluebird:
	mocha test/bluebird.js

time:
	mocha test/time.js

test:
	jshint --exclude-path .gitignore .
	mocha

.PHONY: bluebird test
