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
    /* Check if user exists and if password=paswordConfirm */
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

async function changePassword(req, res, next) {
  const user = req.user || User.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(400).send(
      new ResponseMessage(null, {
        name: 'ResetPasswordError',
        message: 'User does not exist.'
      })
    );
  } else if (
    !req.skipOldPasswordCheck &&
    !user.validPassword(req.body.oldPassword)
  ) {
    res.status(400).send(
      new ResponseMessage(null, {
        name: 'ResetPasswordError',
        message: 'Incorrect password entered'
      })
    );
  } else if (req.body.newPassword !== req.body.passwordConfirm) {
    res.status(400).send(
      new ResponseMessage(null, {
        name: 'RegistrationError',
        message: 'New password is not the same as password confirmation.'
      })
    );
  } else {
    user.password = req.body.newPassword;
    user.save();
    res.status(201).send(new ResponseMessage('Successfully changed password.'));
  }
}

module.exports = {
  handleSuccessfulLogin,
  handleFailedLogin,
  register,
  logout,
  getResetToken,
  verifyResetToken,
  changePassword
};
