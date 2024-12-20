function dmSocketHandler (io) {

    const dmIo = io.of('/dmChat')

    dmIo.on('connection', (socket) => {
        console.log('connection established in dmSocketHandler')
        socket.on('message', (data)=>{
            dmIo.to(data.destinationSocket).emit(data.msg)
            console.log(`message sent to ${data.destinationSocket}, msg : ${data.msg}`)
        })
    });
  
  };
  
module.exports = dmSocketHandler;

// eventType: 'directmessage'
//     data : {
//         msgBody : 'hello from john',
//         userDetails: active: true
//         chatGroups: ["675d577b96b34ec4014e7b1d", "675d58dafcfd712f7b1f3df7", "6761d52ca11761b5a1d40f6b",…]
//         createdAt: "2024-12-14T06:23:03.274Z"
//         email: "deepak@test.com"
//         name: "Deepak"
//         password: "$2a$10$zlOaSUFLKjz1/mq1VYKfsedSyLwLSB34XKSbvEsnJfSkQ7JozFeX6"
//         updatedAt: "2024-12-18T18:42:29.623Z"
//         __v: 0
//         _id: "675d244737f2010d2af4b4f8"
//     }