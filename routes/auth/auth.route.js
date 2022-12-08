const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const {config} = require('../../config/config');

const router = express.Router();

router.post('/',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;

      const payload = {
        sub: user.id,
        role: user.role
      }

      const response = {
        user,
        token: jwt.sign(payload, config.jwtSecret)
      }

      res.json(response)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;