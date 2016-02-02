
test: redis-flush
	mocha --harmony -b

redis-flush:
	redis-cli flushall

.PHONY: bluebird test
