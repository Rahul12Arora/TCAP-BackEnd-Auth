const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./routes/userRoute");
const ChatGroupRouter = require("./routes/ChatGroupRoutes");
const port = process.env.PORT || 5003;
const getDb = require('./startup/dbConnection')
const listCollections = require('./startup/listCollections')
const startSocketConnection = require("./startup/socketIO");
const { Server } = require('socket.io');
const http = require('http');
dotenv.config();

const app = express();
app.use(express.json());
getDb();
listCollections;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Dynamic frontend URL
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on('connection', (socket) => {
  // console.log('A user connected:', socket.id);

  // Example of listening to an event
  socket.on('message', (data) => {
    // console.log('Message received from frontend -> ', data);
    // data += " This is added from backend";
    // Broadcast the message to all connected clients
    io.emit('message', data);
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
