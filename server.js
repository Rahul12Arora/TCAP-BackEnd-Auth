const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socketConnection = require('./startup/socketIOConnection'); // Socket.IO logic
const routes = require('./routes/routes'); // Express routes
const cors = require("cors");
const port = 8080;
const mongoose = require("mongoose");
require('./startup/dbConnection')()
require('./startup/listCollections')
mongoose.set("strictQuery", true);

const app = express();
app.use(cors({
    origin: "*", // Allow all origins during development
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

// Create HTTP server using Express
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
    cors: {
      origin: "*", // Dynamic frontend URL
    //   origin: "http://localhost:3000", // Dynamic frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

// Use Socket.IO logic

//using function to process socket server
socketConnection(io);

// Use Express routes
app.use('/', routes);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
