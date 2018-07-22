* Connect
* Finish wiring together the connect request to model and routing
* Handle pending requests
* Test user connections list in model
* change connect button text to pending while req is pending (not sure how, yet)
* ability to accept / decline pending connection
* Add flash messages when connect is clicked - Dispatch flash message
*	- UserActions[logout]	dispatch({ type: FLASH_MESSAGE, payload: 'Successfully Logged Out' })
*	- UserActions[addConnection] dispatch({ type: FLASH_MESSAGE, payload: 'Connected Added - first/last name' })

* Dashboard
* Add pending connection count
* Style 
* List pending connections
* Accept / Decline

* Error Handling
* Complete - Implement flash messages for errors
* Check all endpoints error handing - client side

* Miscellaneous
* Todos in files
* Create Navigation component and move jsx from Navigation container - check all other containers