const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Name"],
      min: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter the Email"],
      trim: true,
      unique: [true, "This email is already is registered"],
    },
    password: {
      type: String,
      required: [true, "Please enter the Password"],
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;