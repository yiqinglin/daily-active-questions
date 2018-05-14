/* eslint-disable no-console, newline-after-var */
import 'babel-polyfill';
import "isomorphic-fetch"
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import firebase from 'firebase';
import firebaseAdmin from 'firebase-admin';
import passport from 'passport';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import settings from 'settings';
import schema from 'schema';

// Initialize firebase db.
const serviceAccount = require('../../daily-active-questions-firebase-adminsdk-qrgh4-b8674391d6.json');

const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});
export const db = firebaseAdmin.firestore();

const FirestoreStore = require('firestore-store')(session);
/**
 * Initialize the application.
 */
const app = module.exports = express();

app.db = db;
/**
 * Support json & urlencoded requests.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function loginmiddleware(req, res, next) {
  console.log('login middleware', req.user && req.user.id);
  next();
}

/**
 * Initialize Passport
 */
app.use(session({
  store:  new FirestoreStore( {
    database: db
  } ),
  secret: 'a-very-secret-sauce',
  cookie: { maxAge: 2628000000 },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * GraphQL
 */

app.use('/graphql', bodyParser.json(), graphqlExpress(req =>({
  schema,
  context: req
})));

if (process.env.NODE_ENV !== 'production') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));
app.use(loginmiddleware);
/**
 * Auth routes
 */
require('./services/auth');

/**
 * Byh default, serve our index.html file
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
