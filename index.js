const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const port = process.env.PORT || 5003;
const getDb = require('./startup/dbConnection')
const listCollections = require('./startup/listCollections')
dotenv.config();

const app = express();
app.use(express.json());
getDb();
listCollections;
app.use(cors());

app.get("/", (req, res) => {
  //   res.send("Home Page");
  res.status(200).json({
    status: "success",
    message: "Home",
  });
});

app.use("/user", userRouter);

mongoose.set("strictQuery", true);

app.listen(port, () => {
    console.log('Server started at port ' + port);
});