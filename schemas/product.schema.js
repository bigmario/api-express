const Joi = require('joi');

const limit = Joi.number().integer().positive()
const offset = Joi.number().integer()

const id = Joi.number().integer().positive().min(1);
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const min_price = Joi.number().integer().min(10);
const max_price = Joi.number().integer().min(10);
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

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  min_price: min_price,
  max_price: Joi.when('min_price', {
    is: Joi.exist(),
    then: max_price.required()
  })
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getOneProductSchema,
  queryProductSchema
}
