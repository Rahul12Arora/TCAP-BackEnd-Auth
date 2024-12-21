const redis = require('../startup/ioRedis')

// Or ioredis returns a promise if the last argument isn't a function
redis.get("mykey").then((result) => {
    console.log(result); // Prints "value"
});