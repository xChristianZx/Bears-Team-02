const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
				userPhotoURL
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
				userPhotoURL
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
		userPhotoURL
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
		userPhotoURL
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

// Send a Message
router.post('/sendmessage', requireAuth, (req, res) => {
	console.log('USER', req.body)
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
	let messages = {
		sent: null,
		received: null
	}

	Message.find({ receivingUser: req.user._id })
		.populate('sendingUser', '-pendingConnectionRequests -messages -email')
		.exec((err, message) => {
			if(!message) {
				res.json({
					success: false
				}) 
			}
			messages.received = message
			Message.find({ sendingUser: req.user._id })
				.populate('receivingUser', '-pendingConnections -messages -email')
				.exec((err, message) => {
					if(message) {
						messages.sent = message
						return res.json({   
							success: true,
							messages 
						})
					}
					 else {
						 res.json({
							 success: false,
							 err
						 })
					 }
				})
		})
});

router.post('/readmessage', requireAuth, (req, res) => {
	let messageId = req.body.messageId
	Message.findById(messageId, (err, message) => {
		if(message) {
			message.read = true
			message.save((err, message) => {
				if(!message) {
					res.json({
						success: false
					})
				}
			})
		}
	})
	res.json({
		success: true
	})
})

module.exports = router;
