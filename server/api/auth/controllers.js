const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require('../../models');
const { ResponseMessage, sendMail } = require('../utils');

function handleSuccessfulLogin(req, res) {
  res.json(new ResponseMessage(req.user));
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

function logout(req, res, next) {
  req.logout();
  res.send(new ResponseMessage('Succefully logged out.'));
}

async function getResetToken(req, res, next) {
  try {
    const to = req.body.email;
    const user = await User.findOne({ where: { email: to } });


    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      const hashedToken = bcrypt.hashSync(token, 14);

      await user.update({
        resetToken: hashedToken,
        resetTokenExpiration: Date.now() + 360000
      });

      const subject = `${process.env.APP_NAME}: Reset Password Link`;
      const text = `Click here to reset you password. ${
        process.env.CLIENT_URL
      }reset-password/${hashedToken}`;

      try {
        sendMail(to, subject, text);
        res.send(new ResponseMessage(to));
      } catch (error) {
        res.status(400).send(
          new ResponseMessage(null, {
            name: 'ResetPasswordError',
            message: 'Failed to send email'
          })
        );
      }
    } else {
      // Send 200 response even if email is not incorrect.
      // Prevents users from guessing if an email exists in the database
      res.send(new ResponseMessage(to));
    }
  } catch (err) {
    err.name = err.name || 'ResetPasswordError';
    next(err);
  }
}

async function verifyResetToken(req, res, next) {
  try {
    const resetToken = req.body.resetToken;
    const user = await User.findOne({ where: { resetToken } });

    if (!user) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'ResetPasswordError',
          message: 'Invalid token.'
        })
      );
    } else if (user.resetTokenExpiration < Date.now()) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'ResetPasswordError',
          message: 'Token has expired.'
        })
      );
    } else {
      res.send(new ResponseMessage(user.email));
    }
  } catch (err) {
    err.name = err.name || 'ResetPasswordError';
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    const user =
      req.user || (await User.findOne({ where: { email: req.body.email } }));

    if (!user) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'ResetPasswordError',
          message: 'Incorrect email.'
        })
      );
    } else if (req.passwordCheck && !user.validPassword(req.body.oldPassword)) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'ResetPasswordError',
          message: 'Current password is incorrect.'
        })
      );
    } else if (req.body.password !== req.body.passwordConfirm) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'RegistrationError',
          message: 'New password is not the same as password confirmation.'
        })
      );
    } else {
      user.password = req.body.password;
      user.save();
      res
        .status(201)
        .send(new ResponseMessage('Successfully changed password.'));
    }
  } catch (err) {
    err.name = err.name || 'ResetPasswordError';
    next(err);
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
