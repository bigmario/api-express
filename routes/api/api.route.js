const express = require('express')
const checkApiKey = require('../../middlewares/auth.handler')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido',
    statusCode: res.statusCode
  });
});

router.get('/test_auth', checkApiKey, (req, res) => {
  res.json({
    message: 'Authorized',
    statusCode: res.statusCode
  });
});

module.exports = router;
