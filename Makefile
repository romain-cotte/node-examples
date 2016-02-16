
test: redis-flush
	mocha --compilers js:babel-core/register --require babel-polyfill

redis-flush:
	redis-cli flushall

lint:
	eslint ./{classes,models,test}{/**,}/*.js

.PHONY: bluebird test
