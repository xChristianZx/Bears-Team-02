const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  ConversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sendingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is sending the message
  receivingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is receiving the message
  messageBody: {
    type: String,
    validate: {
      validator: body => body.length > 1,
      message: "Cannot send an empty message"
    },
    required: [true, "Cannot send an empty message"]
  },
  read: { type: Boolean, default: false },
  dateSent: { type: Date, default: Date.now() }
})

const Message = module.exports = mongoose.model('Message', MessageSchema)
 
module.exports.create = (newMessage, callback) => {
  newMessage.save(callback)
}