const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sendingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is sending the message
  receivingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is receiving the message
  messageBody: { type: String, required: true },
  read: { type: Boolean, default: false }
})

const Message = module.exports = mongoose.model('Message', MessageSchema)
 
module.exports.create = (newMessage, callback) => {
  newMessage.save(callback)
}