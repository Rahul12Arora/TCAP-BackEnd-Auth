function notificationSocket (io) {

    //handling basic connection
    io.on('connection', (socket) => {
        console.log('A user connected to notification namespace');
  
        socket.on('message', (msg) => {
            console.log(`Received message: notificationSocket ${msg}`);
            socket.broadcast.emit('message', msg);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
  };
  
  module.exports = notificationSocket;