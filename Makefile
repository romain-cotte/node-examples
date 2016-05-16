
test: redis-flush
	mocha

redis-flush:
	redis-cli flushall

lint:
	eslint ./{classes,models,test}{/**,}/*.js

.PHONY: bluebird test
