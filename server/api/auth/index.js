const router = require('express').Router();
const passport = require('./passportStrats');
const controllers = require('./controllers');

/**
 * Authentication routes
 * Note: login controller is handled by passort.authenticate
 * See ./passportStrats for details
 */

// POST api/auth/login
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  controllers.handleSuccessfulLogin
);

// POST api/auth/register
router.post(
  '/register',
  controllers.register,
  controllers.handleSuccessfulLogin
);

// POST api/auth/logout
router.get('/logout', controllers.logout);

// GET api/auth/reset-token
router.post('/reset-token', controllers.getResetToken);

// POST api/auth/reset-token
router.post('/verify-token', controllers.verifyResetToken);

// POST api/auth/change-password
router.post(
  '/change-password',
  (req, res, next) => {
    req.passwordCheck = true;
    next();
  },
  controllers.changePassword
);

// POST api/auth/reset-password
router.post('/reset-password', controllers.changePassword);
module.exports = router;
