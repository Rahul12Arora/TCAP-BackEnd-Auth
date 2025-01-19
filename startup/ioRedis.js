const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.

// const redis = new Redis(); // original 

// new updation for aws
const redis = new Redis({
  host: '127.0.0.1',  // Explicitly specify the host
  port: 6379,         // Explicitly specify the port
});

module.exports = redis;
