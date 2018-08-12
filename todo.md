Future Features
- Add oAuth - Github/ Google
- Delete User Profile

Profile
- Build Form

User Image
- What about image upload??

Sign up/ Login Form
- Set username to lowercase before registering to remove case sensitivity
- Note: Can use normalizing on redux-form; and regex or toLower on mongoose/passport local side

Styling
- Restyle Landing Title and Navbar

Flash Messaging
- Add to logout confirmation

NOTE: Currently messages array on the user model is redundant, messages will be referenced inside conversations, I will rename messages array on user model to unreadMessages so can track notifications, once a message is marked as read, remove from array.
