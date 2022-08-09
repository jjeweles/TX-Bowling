// require mongoose
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const chatSchema = new mongoose.Schema(
    {
        chatTitle: String,
        chatName: String,
        chatMessage: String,
        chatReplies: [{
            chatReply: String,
            chatReplyName: String,
        }]
    },
    {
        timestamps: true,
    }
);
// create variable to call Schema
chatSchema.plugin(paginate);
const Chat = mongoose.model('Chat', chatSchema);

// export bowlers for use in other files
module.exports = Chat;
