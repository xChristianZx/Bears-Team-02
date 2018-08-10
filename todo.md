Future Features
- Delete User Profile
- Add oAuth - Github/ Google

Feature
- Add an input for user url for image - ??What about image upload??

Refactor
  - Rename founderRoutes to connectRoutes
  - Separation of concerns:
    - server routing [auth, connections, ...]    

Error Fix - 
 - It is possible to add more than one request to the same user - ??How?? 

Sign up/ Login Form
- Set username to lowercase before registering to remove case sensitivity
- Note: Can use normalizing on redux-form; and regex or toLower on mongoose/passport local side

Styling
- Restyle Landing Title and Navbar
- Dashboard - active class to options

Revisit
- Refactor Connect/Dashboard re-render after getPendingRequest update
  - Possible solution: need to update reducer state after successful action returns from server

Adam Outstanding:
Implement BulmaBadge for notifications.
Edit message rendering to send sent and received back to user.
Wire up mark as read
Ensure when msg marked as read, it is removed from notifications