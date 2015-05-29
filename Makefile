bluebird:
	mocha test/bluebird.js

test:
	jshint --exclude-path .gitignore .
	mocha

.PHONY: bluebird test
