const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    active: {
      type: Boolean,
      default: true,
    },
    chatGroups: [{
        type: Schema.Types.ObjectId,
        ref: 'ChatGroup',
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;