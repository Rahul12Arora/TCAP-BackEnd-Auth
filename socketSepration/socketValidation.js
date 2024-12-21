const redis = require('../startup/ioRedis')

function isValid (socket){
    const token = socket.handshake.auth.token;
    redis.set(token, socket.id, "EX", 10000)
}

module.exports = isValid;