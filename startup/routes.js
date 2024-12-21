const UserRouter = require("../routes/userRoute");
const ChatGroupRouter = require("../routes/ChatGroupRoutes");

module.exports = function (app) {
    app.use('/user', UserRouter);
    app.use('/chat-group', ChatGroupRouter);
}
