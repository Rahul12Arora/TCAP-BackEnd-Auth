const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const chatGroupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    groupImageUrl: {
        type: String,
    }
}, { timestamps: true });

const ChatGroup = mongoose.model("ChatGroup", chatGroupSchema);

module.exports = ChatGroup;