const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./routes/userRoute");
const ChatGroupRouter = require("./routes/ChatGroupRoutes");
const port = process.env.PORT || 8080;
const getDb = require('./startup/dbConnection')
const listCollections = require('./startup/listCollections')
const startSocketConnection = require("./startup/socketIO");
const { Server } = require('socket.io');
const http = require('http');
dotenv.config();
console.log("port -> ", port);

const app = express();
app.use(express.json());
getDb();
listCollections;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001", // Dynamic frontend URL
    methods: ["GET", "POST"],
  },
});

// Store user info (assuming you are storing usernames with socket.id)
const userMap = {};
const callBack = (msg) => {
  console.log("Call Back -> ", msg);
}

// Handle socket connections
io.on('connection', (socket) => {
  // console.log('A user connected:', socket.id);
  // Join a room
  socket.on('JoinRoom', (payload) => {
    console.log("Payload room -> ", payload);
    socket.join(payload.roomId);
    socket.leave(payload.oldRoomId);
    console.log(`User ${payload.userName} joined room: ${payload.roomName}`);
    userMap[socket.id] = payload.userName;

    // Notify others in the room
    // socket.to(room).emit('message', `${socket.id} has joined the room.`);
    socket.to(payload.roomId).emit('RoomJoined', { payload });
  });

  // Example of listening to an event
  socket.on('message', (data) => {
    console.log('Message received from frontend -> ', data.room, data.payload.msgBody, data.payload.userDetails.name);

    // data += " This is added from backend";
    // Broadcast the message to all connected clients
    // socket.to(data.room).emit('message', data.payload);
    // socket.to(data.room).emit('message', data.payload, (response) => {
    //   // Callback function to confirm delivery
    //   console.log("Message delivered to clients:", response);
    //   // callback('Message delivered successfully');
    // });
    if (io.sockets.adapter.rooms.get(data.room)) {
      io.to(data.room).emit('message', data.payload, () => {
        console.log("Message delivered to clients in room:", data.room);
        // callBack('Message delivered successfully');
      });
    } else {
      console.log("Room does not exist:", data.room);
      callBack('Room does not exist');
    }
    // io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get("/", (req, res) => {
  //   res.send("Home Page");
  res.status(200).json({
    status: "success",
    message: "Home",
  });
});

app.use("/user", UserRouter);
app.use("/chat-group", ChatGroupRouter);

mongoose.set("strictQuery", true);

server.listen(port, () => {
    console.log('Server started at port ' + port);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});
