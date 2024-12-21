function groupSocketHandler (socket, io) {
  console.log("groupSocketHandler -> ");

  socket.on('JoinRoom', (payload) => {
    console.log("Payload room -> ", payload);

    //joining room
    socket.join(payload.roomId);
    socket.leave(payload.oldRoomId);
    console.log(`User ${payload.userName} joined room: ${payload.roomName}`);
    // userMap[socket.id] = payload.userName;

    // Notify others in the room
    // socket.to(room).emit('message', `${socket.id} has joined the room.`);
    io.of('/groupChat').to(payload.roomId).emit('RoomJoined', { payload });
    io.of('/groupChat').to(payload.roomId).emit('message', { payload });
    // io.of('/groupChat').to(payload.roomId).emit('message', 'hello from grpupchat namespace room');
    // io.to(payload.roomId).emit('message', { payload });
    // socket.emit('message', { payload });
  });

  socket.on('message', (data) => {
      
      // console.log("Data -> ", data);
      //sending message to rest of the group
      io.of('/groupChat').to(data.roomId).emit("message", data)
      console.log(`Received message for data.roomId = ${data.roomId} & forwarded to the group: ${data.msgBody}`);
  });
};

module.exports = groupSocketHandler;