const dmSocketHandler = require('../socketSepration/dmChatSocket')
const groupSocketHandler = require('../socketSepration/groupChatSocket')
const notificationSocket = require('../socketSepration/notificationSocket')
// const redis = require('../startup/ioRedis')
const isValid = require('../socketSepration/socketValidation')

function socketConnection (io) {
  
  // io.use((socket, next) => {
  //   if (isValid(socket)) {
  //     next();
  //   } else {
  //     next(new Error("invalid"));
  //   }
  // });

  // io.use((socket, next) => {
  //   if (addUserInRedis(socket)) {
  //     next();
  //   } else {
  //     next(new Error("invalid"));
  //   }
  // });

  //handling basic connection
  io.on('connection', (socket) => {
      console.log('A user connected: socketIOConnection file', socket.id);

      socket.on('message', (msg) => {
          console.log(`Received message: socketIOConnection file: ${msg}`);
          socket.emit('response', 'Message received: socketIOConnection file');
      });
      socket.on('disconnect', () => {
          console.log('User disconnected');
      });
  });

  //handling nameSpace Connections seprately
  dmSocketHandler(io);

  io.of("/groupChat").on("connection", (socket) => {
    console.log('a user connected to /groupChat namespace')
    groupSocketHandler(socket)
  });

  io.of("/notifications").on("connection", (socket) => {
    console.log('a user connected to /notifications namespace')
    notificationSocket(socket)
  });
};

module.exports = socketConnection;