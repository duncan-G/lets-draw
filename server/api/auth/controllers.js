const { User } = require('../../models');
const { ResponseMessage } = require('../utils');

function handleSuccessfulLogin(req, res) {
  console.log(req.cookies, 'cookies');
  res.json(new ResponseMessage('Successfully logged in.'));
}

function handleFailedLogin(err, req, res, next) {
  err.message = 'Incorrect Email/Password.';
  res.status(401).send(new ResponseMessage(null, err));
}

async function register(req, res, next) {
  try {
    /* Check if user exists */
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    if (user) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'RegistrationError',
          message: 'Account already exists. Please log in.'
        })
      );
    } else if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send(
        new ResponseMessage(null, {
          name: 'RegistrationError',
          message: 'Password is not the same as password confirmation.'
        })
      );
    } else {
      /** Create and login user
       * passport attaches req.login method
       */
      const newUser = await User.create({
        email: req.body.email,
        password: req.body.password
      });
      req.login(newUser, err => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    }
  } catch (err) {
    err.name = err.name || 'RegistrationError';
    next(err);
  }
}

async function logout(req, res, next) {}

async function getResetToken(req, res, next) {}

async function verifyResetToken(req, res, next) {}

async function resetPassword(req, res, next) {}

module.exports = {
  handleSuccessfulLogin,
  handleFailedLogin,
  register,
  logout,
  getResetToken,
  verifyResetToken,
  resetPassword
};
