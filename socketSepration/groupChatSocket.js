function groupSocketHandler (socket) {

    socket.on('message', (data) => {
        
        //sending message to rest of the group
        socket.to(data.roomId).emit(data.msgbody)
        console.log(`Received message for data.roomId = ${data.roomId} & forwarded to the group: ${data.msgbody}`);
    });
  };
  
module.exports = groupSocketHandler;