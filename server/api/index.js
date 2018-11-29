const router = require('express').Router();
const authRouter = require('./auth');

router.use('/auth', authRouter)

router.use((err, req, res, next) => {
  res.status(500).json(new ErrorMessage(err))
})

function ErrorMessage(err) {
  this.message = err.message || 'Something went wrong'
  this.type = err.name || 'UKNOWN ERROR OCCURED'
}

module.exports = router;
