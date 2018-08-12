const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jwt-simple');

const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const requireAuth = passport.authenticate('jwt', { session: false });

// Start a Conversation
router.post('/conversation', requireAuth, (req, res) => {
	let newConversation = new Conversation({
		sendingUser: req.user._id,
		receivingUser: req.body.receivingUserId,
		subject: req.body.subject,
	});

	let newMessage = new Message({
		ConversationId: null,
		sendingUser: req.user,
		receivingUser: req.body.receivingUserId,
		messageBody: req.body.messageBody,
	});

	// Initial save of conversation, sans message
	newConversation.save((err, conversation) => {
		if (err) {
			res.json({
				success: false,
				error: err,
			});
		}
		// Once conversation is saved, add the ID to the message and save
		newMessage.ConversationId = conversation._id;
		newMessage.save((err, message) => {
			if (err) {
				res.json({
					success: false,
					error: err,
				});
			}
			// Once message is saved, push to conversation messages array the messageID and save
			newConversation.messages.push(message._id);
			newConversation.save((err, updatedConversation) => {
				if (err) {
					res.json({
						success: false,
						error: err,
					});
				}
				// Add the messageID to the sendingUsers messages array and save
				User.findById(newMessage.sendingUser, (err, user) => {
					if (err) {
						res.json({
							success: false,
							error: err,
						});
					}
					user.unreadMessages.push(message._id);
					user.save((err, updatedUser) => {
						if (err) {
							res.json({
								success: false,
								error: err,
							});
						}
						// Add the messageID to the receivingUsers messages array and save
						User.findById(newMessage.receivingUser, (err, user) => {
							user.unreadMessages.push(message._id);
							user.save((err, updatedUser) => {
								if (err) {
									res.json({
										success: false,
										error: err,
									});
								}
								res.json({
									success: true,
									conversation: updatedConversation,
								});
							});
						});
					});
				});
			});
		});
	});
});

// Get Conversations
router.get('/conversations', requireAuth, (req, res) => {
	let conversations = {
		started: null,
		received: null,
	};

	Conversation.find({ receivingUser: req.user._id })
		.populate('sendingUser', '-pendingConnectionRequests -messages -email')
		.populate({
			path: 'messages',
			model: 'Message',
			populate: {
				path: 'sendingUser',
				model: 'User'
			}
		})
		.exec((err, conversation) => {
			if (!conversation) {
				res.json({
					success: false,
					error: err,
				});
			}

			conversations.received = conversation;

			Conversation.find({ sendingUser: req.user._id })
				.populate('receivingUser', '-pendingConnectionRequests -messages -email')
				.populate({
					path: 'messages',
					model: 'Message',
					populate: {
						path: 'sendingUser',
						model: 'User'
					}
				})
				.exec((err, conversation) => {
					if (!conversation) {
						res.json({
							success: false,
							error: err,
						});
					}
					conversations.started = conversation;
					return res.json({
						success: true,
						conversations,
					});
				});
		});
});

// Send a Message
router.post('/sendmessage', requireAuth, (req, res) => {
	console.log('USER', req.body);
	let newMessage = new Message({
		sendingUser: req.user,
		receivingUser: req.body.receivingUser,
		messageBody: req.body.messageBody,
	});

	Message.create(newMessage, (err, message) => {
		if (message) {
			User.findById(newMessage.sendingUser._id, (err, user) => {
				if (err) {
					res.json({
						err,
					});
				}
				if (user) {
					user.unreadMessages.push(message._id);
					user.save();

					User.findById(newMessage.receivingUser, (err, receivingUser) => {
						if (err) {
							res.json({
								err,
							});
						}

						if (receivingUser) {
							receivingUser.unreadMessages.push(message._id);
							receivingUser.save();

							res.json({
								success: true,
							});
						}
					});
				}
			});
		} else {
			res.json({
				success: false,
				error: err,
			});
		}
	});
});

/*  Endpoint for getMessages() Action Creator*/
router.get('/messages', requireAuth, (req, res) => {
	let messages = {
		sent: null,
		received: null,
	};

	Message.find({ receivingUser: req.user._id })
		.populate('sendingUser', '-pendingConnectionRequests -messages -email')
		.exec((err, message) => {
			if (!message) {
				res.json({
					success: false,
				});
			}
			messages.received = message;
			Message.find({ sendingUser: req.user._id })
				.populate('receivingUser', '-pendingConnections -messages -email')
				.exec((err, message) => {
					if (message) {
						messages.sent = message;
						return res.json({
							success: true,
							messages,
						});
					} else {
						res.json({
							success: false,
							err,
						});
					}
				});
		});
});

router.post('/readmessage', requireAuth, (req, res) => {
	let messageId = req.body.messageId;
	Message.findById(messageId, (err, message) => {
		if (message) {
			message.read = true;
			message.save((err, message) => {
				if (!message) {
					res.json({
						success: false,
						error: err
					});
				}
			});
		} else {
			res.json({
				success: false,
				error: err
			});
		}
	});
	res.json({
		success: true,
	});
});

router.post('/reply', requireAuth, (req, res) => {
	let conversationId = req.body.conversationId
	let newMessage = new Message({
		ConversationId: conversationId,
		sendingUser: req.user._id,
		receivingUser: req.body.receivingUserId,
		messageBody: req.body.messageBody,
	});

	Conversation.findByIdAndUpdate(conversationId, { $push: { messages: newMessage }}, { new: true}, (err, conversation) => {
		if(!conversation) {
			res.json({
				success: false,
				error: err
			})
		}
		newMessage.save((err, message) => {
			if (err) {
				res.json({
					success: false,
					error: err,
				});
			}
		})
		res.json({
			success: true, 
			conversation
		})
	})
})

module.exports = router;
