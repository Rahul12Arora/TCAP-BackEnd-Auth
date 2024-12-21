const redis = require('../startup/ioRedis')

redis.set("mykey", "hello", "EX", 100);