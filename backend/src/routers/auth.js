import express from 'express';
import passport from 'passport';
import session from 'express-session';
import User from '../models/user';

require('dotenv').config();

const SpotifyStrategy = require('passport-spotify').Strategy;

const router = express();

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }),
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:9090/auth/spotify/callback', // REMEMBER TO CHANGE THIS OUT
    },
    // eslint-disable-next-line camelcase
    ((accessToken, refreshToken, expires_in, profile, done) => {
      const {
        provider, id, username, displayName, profileUrl, photos, country, followers,
      } = profile;
      User.find({ spotifyId: id })
        .then((users) => {
          if (users && users.length === 0) {
            User.create({
              provider, spotifyId: id, username, displayName, profileUrl, photos, country, followers,
            }).then((user) => {
              return done(null, { profile: user, accessToken, refreshToken });
            }).catch((error) => {
              return done(error, null);
            });
          } else {
            done(null, { profile, accessToken, refreshToken });
          }
        }).catch((error) => {
          return done(error, null);
        });
    }),
  ),
);

router.get('/failure', (req, res) => { return res.send('failure:('); });
router.get('/login', passport.authenticate('spotify', { scope: ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-top-read'] }));
router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:8080/#${req.user.profile.username}&${req.user.accessToken}&${req.user.refreshToken}`);
  },
);

// router.get('/loggedIn', (req, res) => { console.log('!@#(*^$', req.user); return (res.send(req.user)); });
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };
export default router;
