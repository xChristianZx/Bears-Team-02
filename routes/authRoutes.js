const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const ConnectionRequest = mongoose.model('ConnectionRequest');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { isLoggedIn } = require('../middleware/helper');
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
			console.log('authRoutes[User.register] - err', err);
			return res.status(400).send(err);
		}
		passport.authenticate('local')(req, res, () => {
			console.log('authRoutes[passport.authenticate] - REQ.USER', req.user);			
			
			const { _id, firstName, lastName, username, email, connections, pendingConnectionRequests } = req.user;
			const foundUser = { _id, firstName, lastName, username, email, connections, pendingConnectionRequests };

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
	console.log(`User Logged In - ${req.user.username}`);
	const { _id, firstName, lastName, username, email, location, isTechnical, connections, pendingConnectionRequests } = req.user;
	// using founderUser to prevent exposure of password salt/hash
	const foundUser = { _id, firstName, lastName, username, email, connections, isTechnical, pendingConnectionRequests, location };
	console.log('req.user', req.user)
	console.log('Found User', foundUser)
	return res.status(200).send({
		user: foundUser,
		message: 'User Logged In',
		token: userToken(req.user),
	});
});

// == Logout == //
router.get('/logout', (req, res) => {
	console.log(`Logged Out - ${req.user.username}`);
	const logoutmessage = `${req.user.username} has been successfully logged out.`;
	req.logout();
	res.status(200).send({ message: logoutmessage });
});

// == Dashboard == //
router.get('/dashboard', requireAuth, (req, res) => {
	User.findById(req.user._id)
		.populate('connections')
		.populate('pendingConnectionRequests.requestedUser')
		.populate('pendingConnectionRequests.requestingUser')
		.exec((err, user) => {
			if (err) {
				console.log(err);
			}
			console.log('[ /dashboard ] - user', user);
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

// Will be refactored once it functional on client side
// router.post('/addconnection', requireAuth, (req, res) => {
// 	let requestingUser = req.user
// 	let requestedUser = req.body.requestedUser // ID

// 	let connectionRequest = {
// 		requestedUser,
// 		requestingUser
// 	}

// 	User.findById(req.user._id, (err, user) => {
// 		if(user) {
// 			user.pendingConnectionRequests.push(connectionRequest)
// 			console.log('User Req', user)
// 			user.save()
// 		}
// 			console.log('findbyid', err)
// 	})

// 	User.findById(requestedUser, (err, user) => {
// 		if(user) {
// 			user.pendingConnectionRequests.push(connectionRequest)
// 			console.log('User Reqee', user)
// 			user.save()
// 		}
// 		console.log('findbyid2', err)
// 	})

// 	res.json({
// 		success: true
// 	})
// })

// Send Connection Request
router.post('/connectionrequest', requireAuth, (req, res) => {
	console.log(req.body);
	let newConnectionRequest = {
		requestingUser: req.user._id,
		requestedUser: req.body.requestedUser,
	};
console.log("newConnectionRequest", newConnectionRequest)
// console.log(`NOTE to self: newConnectionRequest .create is commented out; not creating new requests`)
	ConnectionRequest.create(newConnectionRequest, (err, conReq) => {
		if (conReq) {
			console.log('conReq', conReq);
			res.json({
				success: true,
				conReq,
			});
		}
	});
});

/*  Endpoint for getPendingConnections() Action Creator*/
router.get('/pendingconnections', requireAuth, (req, res) => {
	let connectionRequests = {
		pending: [],
		acceptable: []
	}

	ConnectionRequest.find({ requestingUser: req.user._id })
		.populate('requestedUser')
		.exec((err, connReqs) => {
		let error = null

		if(err) {
			error = err
		}
		
		connReqs.map(connReq => {
			connectionRequests.pending.push(connReq)
		})

		ConnectionRequest.find({ requestedUser: req.user._id })
		.populate('requestingUser')
		.exec((err, connReqs) => {
			if(err) {
				error = err
			}
			connReqs.map(connReq => {
				connectionRequests.acceptable.push(connReq)
			})

			let count = connectionRequests.pending.length + connectionRequests.acceptable.length
			if(error) {
				res.json({
					success: false,
					error
				})
			} else {
					res.json({
						success: true,
						connectionRequests,
						pendingRequests: count
					})
			}
		})
	})
});

module.exports = router;

/* 
  * TEMP Routing
  router.get('/register', (req, res) => {
	  res.render('register');
	});
	
	router.get('/login', (req, res) => {
		res.render('login');
	});
	
	router.get('/secret', isLoggedIn, (req, res) => {
		res.render('secret');
	});
*/
