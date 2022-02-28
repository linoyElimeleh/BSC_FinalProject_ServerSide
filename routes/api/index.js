const router = require('express').Router();
const healthCheckRouter = require('./healthCheck');
const categoriesRouter = require('./categoriesRouter');
const authRouter = require('./authRouter');
const testRouter = require('./testRouter');
const usersRouter = require('./usersRouter');

router.use('/', healthCheckRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/test-auth', testRouter);
router.use('/users', usersRouter);


router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;