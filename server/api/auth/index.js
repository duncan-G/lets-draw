const router = require('express').Router();
const passport = require('./passportStrats');
const controllers = require('./controllers');

/**
 * Authentication routes
 * Note: login controller is handled by passort.authenticate
 * See ./passportStrats for details
 */

router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  controllers.handleSuccessfulLogin
);

router.post(
  '/register',
  controllers.register,
  controllers.handleSuccessfulLogin
);

router.post('/logout', controllers.logout);

router.get('/reset-token', controllers.getResetToken);

router.post('/reset-token', controllers.verifyResetToken);

router.post('/reset-password', controllers.resetPassword);

module.exports = router;
