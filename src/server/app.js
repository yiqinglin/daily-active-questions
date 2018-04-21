/* eslint-disable no-console, newline-after-var */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import settings from 'settings';
import schema from 'schema';


// import firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyBgXUCCWdiQXtZQR9pQ3Ko9sNDqweOAz_Q",
//   authDomain: "daily-active-questions.firebaseapp.com",
//   databaseURL: "https://daily-active-questions.firebaseio.com",
//   projectId: "daily-active-questions",
//   storageBucket: "daily-active-questions.appspot.com",
//   messagingSenderId: "612912991604"
// };
// const fiebaseApp = firebase.initializeApp(config);
// const db = fiebaseApp.database();
// firebaseDatabase.ref(`questions/axQIJ6mBszpnETjiJKOl`).once('value').then(snapshot => console.log(snapshot.val()));

const admin = require('firebase-admin');

var serviceAccount = require('../../daily-active-questions-firebase-adminsdk-qrgh4-b8674391d6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

// Write
var docRef = db.collection('questions').doc('testquestion');
var setAda = docRef.set({
  question: 'to read documentation?'
});

// Read
db.collection('questions').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

/**
 * Initialize the application.
 */
const app = module.exports = express();

/**
 * Support json & urlencoded requests.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * GraphQL
 */
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (process.env.NODE_ENV !== 'production') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));

/**
 * Byh default, serve our index.html file
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
