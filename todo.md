Future Features
- Notifications
- Message a Connection
- Delete User Profile
- Add oAuth - Github/ Google

Feature
- Add an input for user url for image

Error Fix -
- It is possible to add more than one request to the same user

Sign up/ Login Form
- Set username to lowercase before registering to remove case sensitivity
- Note: Can use normalizing on redux-form; and regex or toLower on mongoose/passport local side

Styling
- Restyle Landing Title and Navbar
- Dashboard - active class to options

Revisit
- Refactor Connect/Dashboard re-render after getPendingRequest update
  - Possible solution: need to update reducer state after successful action returns from server

Possible Refactor
- The list for rendering: connection, pendingConnection and connect users is the same except the buttons
- perhaps I will refactor this as a function to return JSX and map over any buttons passed in.
