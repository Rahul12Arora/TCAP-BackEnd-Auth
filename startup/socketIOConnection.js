const dmSocketHandler = require('../socketSepration/dmChatSocket')
const groupSocketHandler = require('../socketSepration/groupChatSocket')
const notificationSocket = require('../socketSepration/notificationSocket')

function socketConnection (io) {

  //handling basic connection
  io.on('connection', (socket) => {
      console.log('A user connected: socketIOConnection file');

      socket.on('message', (msg) => {
          console.log(`Received message: socketIOConnection file: ${msg}`);
          socket.emit('response', 'Message received: socketIOConnection file');
      });
      socket.on('disconnect', () => {
          console.log('User disconnected');
      });
  });

//   //handling nameSpace Connections seprately
//   io.of("/dmChat").on("connection", (socket) => {
//     console.log('a user connected to /dmChat namespace')
//     dmSocketHandler(socket)
//   });

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