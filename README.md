## Chat Room Web Application
This is an online chat room that doesn't require registration.
*	Frontend built using React hooks as a View layer, and Redux for state management,
*	Firebase used for data management, anonymous user authentication, and deployment
*	Redux-thunk used to handle async action creators in Redux

### Features:
*	The user chooses a theme color when signing in. The users nickname font color will be styled according to the user's selected theme, and visible to all other users.
*	The user is able to delete his previous messages. Upon deletion, a “Message deleted” string will be displayed in place.
*	While waiting for the server to respond for sending or deleting message actions, the application will display a spinner animation on the top right corner with an appropriate message ( 'sending...' / 'deleting..' ), and the number of messages being sent/deleted will appear as well. these loading states will be visible so long as the user is not connected to the internet (due to firebase's offline capabilities, the request will be pending until there is an internet connection)
*	When a user enters the site but is disconnected from the internet, an appropriate error messages will appear (after a few seconds) alongside to a spinner animation
*	Spinner animation will appear when loading the app, when loading all messages from the database ( after the user signes in), and when the  user is posting/deleting a message

### Installation and Dependencies
*	Clone repo locally
*	Run npm install to install all dependencies
*	Run npm start
*	Open http://localhost:3000 to view app in the browser.
