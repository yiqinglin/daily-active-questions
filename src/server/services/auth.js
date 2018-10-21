// @flow
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import app from '~/app';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const userRef = app.db.collection('users').doc(user.id);
  const userProfile = await userRef.get();

  done(null, userProfile.data());
});

//  Use the GoogleStrategy within Passport.
//  Strategies in Passport require a `verify` function, which accept
//  credentials (in this case, an accessToken, refreshToken, and Google
//  profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const userRef = app.db.collection('users').doc(profile.id);
  const userProfile = await userRef.get();

  if (userProfile.exists) {
    done(null, userProfile.data());
  } else {
    app.db.collection('users').doc(profile.id).set(profile)
    .then(function() {
      done(null, profile);
    })
    .catch(function(error) {
      console.log('Passport strategy error:', error);
      done(error, null);
    });
  }
}));

/**
 * GET /auth/google
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  The first step in Google authentication will involve
 * redirecting the user to google.com.  After authorization, Google
 * will redirect the user back to this application at /auth/google/callback
 */
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

/**
 * GET /auth/google/callback
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  If authentication fails, the user will be redirected back to th
 * login page.  Otherwise, the primary route function function will be called,
 * which, in this example, will redirect the user to the home page.
 */
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });


/**
 * Logout
 *
 */
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});