* Connect
* Wire the connect request to model and routing (pending new model schema)
* Test user connections list in model
* ability to accept / decline pending connection

* Add flash messages when connect is clicked - Dispatch flash message

* Add filter for technical and non-technical

*Done* change connect button text to pending while req is pending (not sure how, yet)
*Done* Add flash messages when connect is clicked - Dispatch flash message
*Done*	- UserActions[logout]	dispatch({ type: FLASH_MESSAGE, payload: 'Successfully Logged Out' })
*Done*	- UserActions[addConnection] dispatch({ type: FLASH_MESSAGE, payload: 'Connected Added - first/last name' })

* Dashboard
* List pending connections
* Accept / Decline
* Add Active class when Active

* Error Handling
* Check all endpoints error handing - client side
*Done* - Implement flash messages for errors

* Miscellaneous
* Todos in files
*Done* Create Navigation component and move jsx from Navigation container - check all other containers


ConnectionRequest.findById -> requestedUser, requestingUser -> Add to opposite user.connections connectionRequest.pop()

- Authentication
  - Fix Authentication problem where AUTHENTICATED is dispatched but User state does not persist

* Add flashmessage on pendingConnection success
* Add flashmessage on pendingConnectionResponse 
* Connect Page and Dashboard don't update until refresh