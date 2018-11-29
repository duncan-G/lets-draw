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
            return done(null, false, { message: 'Incorrect Email/Password.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect Email/Password.' });
          }

          /* Return userId */
          return done(null, user.id);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );

  /* Serialize userId into a session cookie */
  passport.serializeUser((userId, done) => {
    done(null, userId);
  });

  /* Deserialize user from a session cookie*/
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

  return passport
})();
