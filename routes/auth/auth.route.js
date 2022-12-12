const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const {config} = require('../../config/config');

const AuthService = require('../../services/auth/auth.service')
const service = new AuthService()

const router = express.Router();

router.post('/',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(service.signToken(req.user))
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendMail(email);
      res.json(response)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
