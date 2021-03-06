import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import moment from 'moment';
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
    const newUser = {
      gender: profile.gender,
      id: profile.id,
      displayName: profile.displayName,
      avatar: profile.photos && profile.photos[0].value,
      language: profile._json.language,
      name: profile.name,
      provider: profile.provider,
      registeredAt: moment().format()
    };

    app.db.collection('users').doc(profile.id).set(newUser)
    .then(function() {
      done(null, newUser);
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
  req.session.destroy((err) => {
    res.status(200).clearCookie('connect.sid', {domain: 'localhost', path:'/'})
    res.redirect('/');
  })
});