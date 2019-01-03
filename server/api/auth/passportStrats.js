const passport = require('passport');
const LocalStatedgy = require('passport-local');

const User = require('../../models/user');

module.exports = (() => {
  /* Local in-memory statedgy */
  passport.use(
    new LocalStatedgy(
      {
        usernameField: 'email'
      },
      async (email, password, done) => {
        try {
          /* Find user */
          const user = await User.findOne({
            where: { email: email }
          });

          /* Validate password */
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }

          /* Return user Email */
          return done(null, user.email);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  /* Serialize userId into a session cookie */
  passport.serializeUser((userEmail, done) => {
    done(null, userEmail);
  });

  /* Deserialize user from a session cookie*/
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findByEmail(email, {
        attributes: {
          exclude: ['password']
        }
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  return passport
})();
