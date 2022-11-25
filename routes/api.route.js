const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido',
    statusCode: res.statusCode
  });
});

module.exports = router;
