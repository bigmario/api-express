const express = require('express');
const passport = require('passport');
const {config} = require('../../config/config');
const OrderService = require('../../services/orders/order.service');

const router = express.Router();

const service = new OrderService();


router.get('/my-orders',
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub)
      res.json(orders)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
