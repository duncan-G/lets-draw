const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStatedgy = require('passport-local');

const { User } = require('../models');

// Login Statedgy
passport.use(
  new LocalStatedgy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email: email }
        });

        if (!user) {
          return done(null, false, { message: 'Incorrect Email/Password.' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect Email/Password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, {
      attributes: {
        exclude: ['password']
      }
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.send(req.user);
});

router.post('/logout', (req, res, next) => {
  res.send('yes');
});

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (user) {
      res.status(400).send('Email account already exists. Please log in');
    }
    let hash = bcrypt.hashSync(req.body.password, 14);

    const newUser = await User.create({
      email: req.body.email,
      password: hash
    });
    res.user = newUser;
    res.redirect('/login');
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/reset-token', (req, res, next) => {
  res.send('yes');
});

router.post('/reset-password', (req, res, next) => {
  res.send('yes');
});

module.exports = router;
