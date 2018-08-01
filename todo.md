- Dashboard
  - Add functionality to update form

- Error Handling
  - Check all endpoints error handing - client side

- Store/ Authentication
  - Tweak token grab to getUser data on refresh for state to persist - Fix Authentication problem where AUTHENTICATED is dispatched but User state does not persist

- Flash Messaging  
  - Ensure on all routes

- State/ Lifecycle Hooks
  - Connect Page and Dashboard don't update until refresh

Future Features
- Notifications
- Message a Connection

Possible Refactor
- The list for rendering: connection, pendingConnection and connect users is the same except the buttons
- perhaps I will refactor this as a function to return JSX and map over any buttons passed in.