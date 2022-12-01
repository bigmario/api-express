const Joi = require('joi');

const id = Joi.number().integer().positive().min(1);
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const img = Joi.string().uri();
const categoryId = Joi.number().integer().positive().min(1);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: img.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: img,
  categoryId: categoryId
})

const getOneProductSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getOneProductSchema,
}
