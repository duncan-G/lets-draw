const { User } = require('../../models');

function handleSuccessfulLogin(req, res, next) {
  res.send(
    new ResponseMessage('Successfully logged in.')
  );
}

async function register(req, res, next) {
  try {
    /* Check if user exists */
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    if (user) {
      res
        .status(400)
        .send(
          new ResponseMessage(null, 'Account already exists. Please log in.')
        );
    }

    /** Create and login user
     * passport attaches req.login method
     */
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    await req.login(newUser, err => {
      next(err);
    });

    /* Handle succesful login */
    next();
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {}

async function getResetToken(req, res, next) {}

async function verifyResetToken(req, res, next) {}

async function resetPassword(req, res, next) {}

function ResponseMessage(data, error) {
  this.error = error || '';
  this.data = data || '';
};

module.exports = {
  handleSuccessfulLogin,
  register,
  logout,
  getResetToken,
  verifyResetToken,
  resetPassword
}
