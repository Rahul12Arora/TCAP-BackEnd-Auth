const express = require("express");
const router = express.Router();
const ChatGroup = require("../models/ChatGroupModal.js");
const User = require("../models/User.js");

router.post("/createNewChatGroup", async (req, res) => {
    try {
        const { groupName, createdBy, users } = req.body;
        const chatGroup = await new ChatGroup({
            groupName: groupName,
            createdBy: createdBy,
            users: users,
        });
        for (let i = 0; i < users.length; i++) {
            await User.findByIdAndUpdate(users[i], {
                $push: { chatGroups: chatGroup._id },
            });
        }
        chatGroup.save();

        res.status(200).json(chatGroup);
    } catch (error) {
        console.error("Error -> ", error);
        res.status(400).json(error);
    }
});


router.post("/add-new-member-to-group", async (req, res) => {
    try {
        const { groupId, users } = req.body;
        const chatGroup = await ChatGroup.findByIdAndUpdate(
            groupId,
            { $push: { users: { $each: users } } }, // Correctly structure $push with $each
            { new: true } // Optionally return the updated document
          );
        for (let i = 0; i < users.length; i++) {
            await User.findByIdAndUpdate(users[i], {
                $push: { chatGroups: chatGroup._id },
            });
        }

        res.status(200).json(chatGroup);
    } catch (error) {
        console.error("Error -> ", error);
        res.status(400).json(error);
    }
});

router.get("/getAllChatGroup", async (req, res) => {
    try {
        const chatGroup = await ChatGroup.find().populate("createdBy users");

        res.status(200).json(chatGroup);
    } catch (error) {
        console.error("Error -> ", error);
        res.status(400).json(error);
    }
});

router.get("/getChatGroupDetailsById/:id", async (req, res) => {
    try {
        const chatGroupDetail = await ChatGroup.findById({
            _id: req.params.id,
        }).populate("createdBy users");

        res.status(200).json(chatGroupDetail);
    } catch (error) {
        console.error("Error -> ", error);
        res.status(400).json(error);
    }
});

module.exports = router;