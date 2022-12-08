const express = require('express');
const passport = require('passport');


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido',
    statusCode: res.statusCode
  });
});

router.get('/test_auth', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    message: 'Authorized',
    statusCode: res.statusCode
  });
});

module.exports = router;
