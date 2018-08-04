const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const ConnectionRequest = mongoose.model('ConnectionRequest');
const Message = require('../models/Message');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jwt-simple');

const userToken = user => {
	const timeStamp = new Date().getTime();
	return jwt.encode({ sub: user, iat: timeStamp }, 'secret');
};

const requireAuth = passport.authenticate('jwt', { session: false });

// == Register == //
router.post('/register', (req, res) => {
	const { firstName, lastName, username, email, password } = req.body;
	const isTechnical = req.body.isTechnical ? true : false;

	const newUser = new User({
		firstName,
		lastName,
		username,
		email,
		isTechnical,
	});

	User.register(newUser, password, (err, user) => {
		if (err) {
			return res.status(400).send(err);
		}
		passport.authenticate('local')(req, res, () => {
			const {
				_id,
				firstName,
				lastName,
				username,
				email,
				connections,
				pendingConnectionRequests,
				messages,
			} = req.user;
			const foundUser = {
				_id,
				firstName,
				lastName,
				username,
				email,
				connections,
				pendingConnectionRequests,
				messages,
			};

			return res.status(200).send({
				user: foundUser,
				message: 'User successfully created',
				token: userToken(user),
			});
		});
	});
});

// == Login == //
router.post('/login', passport.authenticate('local'), (req, res) => {
	const {
		_id,
		firstName,
		lastName,
		username,
		email,
		location,
		isTechnical,
		connections,
		pendingConnectionRequests,
	} = req.user;
	// using founderUser to prevent exposure of password salt/hash
	const foundUser = {
		_id,
		firstName,
		lastName,
		username,
		email,
		connections,
		isTechnical,
		pendingConnectionRequests,
		location,
	};
	return res.status(200).send({
		user: foundUser,
		message: 'User Logged In',
		token: userToken(req.user),
	});
});

// == Logout == //
router.get('/logout', (req, res) => {
	const logoutmessage = `${req.user.username} has been successfully logged out.`;
	req.logout();
	res.status(200).send({ message: logoutmessage });
});

// == Dashboard == //
router.get('/dashboard', requireAuth, (req, res) => {
	User.findById(req.user._id)
		.populate('connections')
		.populate('messages')
		.exec((err, user) => {
			if (err) {
				console.log(err);
			}
			res.status(200).send({
				message: 'User Dashboard',
				user,
			});
		});
});

// == isTechnical Handler == //
router.get('/istechnical', requireAuth, (req, res) => {
	let updateIsTechnical = req.user;
	updateIsTechnical.isTechnical = !updateIsTechnical.isTechnical;
	updateIsTechnical.save(() => res.status(200).send({ user: updateIsTechnical }));
});

// Send Connection Request
router.post('/connectionrequest', requireAuth, (req, res) => {
	let newConnectionRequest = {
		requestingUser: req.user._id,
		requestedUser: req.body.requestedUser,
	};
	// console.log(`NOTE to self: newConnectionRequest .create is commented out; not creating new requests`)
	ConnectionRequest.create(newConnectionRequest, (err, conReq) => {
		if (conReq) {
			res.json({
				success: true,
				conReq,
			});
		}
	});
});

// Send a Message
router.post('/sendmessage', requireAuth, (req, res) => {
	let newMessage = new Message({
		sendingUser: req.user,
		receivingUser: req.body.receivingUser,
		messageBody: req.body.messageBody,
	});

	Message.create(newMessage, (err, message) => {
		if (message) {
			User.findById(newMessage.sendingUser._id, (err, user) => {
				if(err) {
					res.json({
						err
					})
				}
				if(user) {
					user.messages.push(message._id)
					user.save()
					
					User.findById(newMessage.receivingUser, (err, receivingUser) => {
						if(err) {
							res.json({
								err
							})
						}

						if(receivingUser) {
							receivingUser.messages.push(message._id)
							receivingUser.save()

							res.json({
								success: true
							});
						}
					})
				}
			})
		} else {
			res.json({
				success: false,
				error: err
			})
		}
	});
});

/*  Endpoint for getMessages() Action Creator*/
router.get('/messages', requireAuth, (req, res) => {
	console.log('ID', req.user._id)
 
	Message.find({ receivingUser: req.user._id })
		.populate('sendingUser', '-pendingConnectionRequests -messages -email')
		.exec((err, message) => {
			if(!message) {
				res.json({
					success: false
				}) 
			}
			if(message) {
				console.log('MESSAGE', message)
				let messages
				messages = message
				
				return res.json({
					success: true,
					messages 
				})
			}
		})
});

/*  Endpoint for getPendingConnections() Action Creator*/
router.get('/pendingconnections', requireAuth, (req, res) => {
	let connectionRequests = {
		pending: [],
		acceptable: [],
	};

	ConnectionRequest.find({ requestingUser: req.user._id })
		.populate('requestedUser')
		.exec((err, connReqs) => {
			let error = null;

			if (err) {
				error = err;
			}

			connReqs.map(connReq => {
				if (connReq.status === 'Pending') {
					connectionRequests.pending.push(connReq);
				}
			});

			ConnectionRequest.find({ requestedUser: req.user._id })
				.populate('requestingUser')
				.exec((err, connReqs) => {
					if (err) {
						error = err;
					}
					connReqs.map(connReq => {
						if (connReq.status === 'Pending') {
							connectionRequests.acceptable.push(connReq);
						}
					});

					let count = connectionRequests.pending.length + connectionRequests.acceptable.length;
					if (error) {
						res.json({
							success: false,
							error,
						});
					} else {
						res.json({
							success: true,
							connectionRequests,
							pendingRequests: count,
						});
					}
				});
		});
});

/*
	Takes a connection request ID the requesting user and action. It then finds the connection
	changes the status to the given action. If the action is accepted it will add the new
	connection to each users connections array.
*/
router.post('/pendingconnectionresponse', requireAuth, (req, res) => {
	let connectionRequest = req.body.connectionRequest.toString();
	let acceptingUser = req.user._id.toString();
	let action = req.body.action;

	ConnectionRequest.findById(connectionRequest, (err, connReq) => {
		if (err) {
			res.json({
				success: false,
				error: err,
			});
		}

		connReq.status = action;
		connReq.save();

		if (action === 'Accepted') {
			User.findById(acceptingUser, (err, user) => {
				if (err) {
					res.json({
						success: false,
						error: err,
					});
				}
				user.connections.push(connReq.requestingUser);
				user.save();

				User.findById(connReq.requestingUser, (err, user) => {
					if (err) {
						res.json({
							success: false,
							error: err,
						});
					}

					user.connections.push(acceptingUser);
					user.save();
					res.json({
						success: true,
						message: 'Connection request accepted.',
					});
				});
			});
		} else {
			res.json({
				success: true,
				message: 'Connection request declined.',
			});
		}
	});
});

module.exports = router;
