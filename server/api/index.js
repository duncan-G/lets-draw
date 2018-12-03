const router = require('express').Router();
const authRouter = require('./auth');
const { handleFailedLogin } = require('./auth/controllers');
const { ResponseMessage } = require('./utils');

router.use('/auth', authRouter);

router.use((err, req, res, next) => {
  // If you pass withFailError=true in passport.authenticate,
  // passportJS throws 500 error on login failure. Handle
  // that error here. Note: without the above option, passportJS
  // with will respond with text instead of JSON.
  if (err.name === 'AuthenticationError' && err.message === 'Unauthorized') {
    handleFailedLogin(err, req, res, next);
  } else {
    res.status(500).send(new ResponseMessage(null, err));
  }
});

router.use((req, res, next) => {
  console.log('why am i here?', req.baseUrl);
  res.status(404).send(
    new ResponseMessage(null, {
      name: '404Error',
      message: `Cannot ${req.method} ${req.path}.`
    })
  );
});

module.exports = router;
