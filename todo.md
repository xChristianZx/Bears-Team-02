- Dashboard
  - Add functionality to update form

Future Features
- Notifications
- Message a Connection
- Delete User Profile
- Add oAuth - Github/ Google

- Refactor
  - Rename founderRoutes to connectRoutes
  - Separation of concerns:
    - action creators 
    - server routing [auth, connections, ...]

Error Fix - 
 - It is possible to add more than one request to the same user

Sign up/ Login Form
 - Set username to lowercase before registering to remove case sensitivity

Styling
  - Restyle Landing Title and Navbar
  - Icons? - Do we need a package for icons to render?
  
Revisit 
- Refactor Connect/Dashboard re-render after getPendingRequest update
  - Possible solution: need to update reducer state after successful action returns from server

Possible Refactor
- The list for rendering: connection, pendingConnection and connect users is the same except the buttons
- perhaps I will refactor this as a function to return JSX and map over any buttons passed in.
