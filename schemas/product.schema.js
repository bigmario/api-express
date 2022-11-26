const Joi = require('joi');

const id = Joi.number().integer().positive().min(1);
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const img = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  img: img.required()
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  img: img
})

const getOneProductSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getOneProductSchema,
}
