import express from 'express';
import passport from 'passport';
import session from 'express-session';

require('dotenv').config();

const MemoryStore = require('memorystore')(session);

const PROD_BE_URL = 'http://spotify-genre-playlists.herokuapp.com';
// const DEV_BE_URL = 'http://localhost:9090';
const PROD_FE_URL = 'http://spotify-genre-playlists.surge.sh/';
// const DEV_FE_URL = 'http://localhost:8080/';

const SpotifyStrategy = require('passport-spotify').Strategy;

const router = express();

router.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  resave: false,
  secret: process.env.SECRET,
  saveUninitialized: true,
}));

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${PROD_BE_URL}/auth/spotify/callback`, // REMEMBER TO CHANGE THIS OUT
    },
    // eslint-disable-next-line camelcase
    ((accessToken, refreshToken, expires_in, profile, done) => {
      done(null, {
        profile, accessToken, refreshToken, userId: profile.id,
      });
    }),
  ),
);

router.get('/failure', (req, res) => { return res.send('failure:('); });
router.get('/login', passport.authenticate('spotify', {
  scope: ['streaming',
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-top-read',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative'],
}));
router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${PROD_FE_URL}#${req.user.profile.username}&${req.user.accessToken}&${req.user.refreshToken}&${req.user.userId}`);
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
