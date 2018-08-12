const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  // ? May want to have an array of users in case we want to have more than two people in conversation
  sendingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is sending the message
  receivingUser: { type: Schema.Types.ObjectId, ref: "User", index: true }, // User that is receiving the message
  subject: {
    type: String,
    required: [true, "A subject for the message is required"]
  }, // Subject Line
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});

const Conversation = (module.exports = mongoose.model(
  "Conversation",
  ConversationSchema
));

module.exports.create = (newMessage, callback) => {
  newMessage.save(callback);
};