var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(new GithubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, cb) => {
  var email = profile._json.email;

  User.findOne( { email }, (err, user) => {
    if(err) return cb(err, false);
    if(!user) {
      var userInfo = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url
      }

      User.create(userInfo, (err, user) => {
        if (err) return cb(err, false);
        cb(null, user);
      })
    }
    cb(null, user);
  })
  
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if(err) return done(err, false);
    done(null, user);
  })
})