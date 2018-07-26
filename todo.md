- Global
  - Remove redundant code
  - Todos in files
  - Check all endpoints error handing - client side
  - Refactor where possible

- Connect
  - Flash Message implementation - Sent, Accepted, Declined
  - Add filter for technical and non-technical
  - Sort out .Catch()
  - Ability to accept / decline pending connection
    

- Dashboard
  - Add functionality to update form
  - Render Connections in the connections tab
  - Render Profile Details in the profile tab
  - Connections - List connections
  - Accept / Decline

- Error Handling
  - Check all endpoints error handing - client side

- Store/ Authentication
  - Tweak token grab to getUser data on refresh for state to persist - Fix Authentication problem where AUTHENTICATED is dispatched but User state does not persist

- Flash Messaging
  - Add flashmessage on pendingConnection success
  - Add flashmessage on pendingConnectionResponse
  - Connect Page and Dashboard don't update until refresh

Future Features
- Notifications
