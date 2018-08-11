Future Features
- Delete User Profile
- Add oAuth - Github/ Google

User Image
- What about image upload??

Error Fix - 
- It is possible to add more than one request to the same user - ** I couldn't reproduce this error **

Sign up/ Login Form
- Set username to lowercase before registering to remove case sensitivity
- Note: Can use normalizing on redux-form; and regex or toLower on mongoose/passport local side

Styling
- Restyle Landing Title and Navbar

Revisit
- Refactor Connect/Dashboard re-render after getPendingRequest update
  - Possible solution: need to update reducer state after successful action returns from server

Adam Outstanding:
Implement BulmaBadge for notifications.
Ensure when msg marked as read, it is removed from notifications