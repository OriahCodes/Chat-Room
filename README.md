## Chat Room Web Application
This is an online chat room that doesn't require registration.
*	Frontend built using **React Hooks** as a View layer, and **Redux** for state management
*	**Firebase** used for data management, anonymous user authentication, and deployment
*	**Redux-Thunk** used to handle async action creators in Redux
* **CSS Vars** Used to configure application theme

### Features:
*	The user's nickname will be styled according to the user's selected theme, and visible to all other users.
*	The user is able to delete his previous messages. Upon deletion, a “Message deleted” string will be displayed in place.
*	While waiting for the server to respond for sending or deleting message actions, the application will display a spinner animation with an appropriate message ( 'sending...' / 'deleting..' ), and the number of messages being sent/deleted will appear as well. SO long as there is no internet connection, the request will be pending until there is an internet connection (due to firebase's offline capabilities).
*	When a user enters the site but is disconnected from the internet, an appropriate error messages will appear alongside to a spinner animation
*	Spinner animations will appear when loading the app, when loading all messages from the database ( after the user signes in), and when the  user is posting/deleting a message

### Installation and Dependencies
*	Clone repo locally
*	Run npm install to install all dependencies
*	Run npm start
*	Open http://localhost:3000 to view app in the browser.
