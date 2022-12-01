const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models} = require('../../libs/sequelize')

class ProductsService {
  constructor() {}

  static _productsServiceInstance = null;

  static async getInstance() {
    if (ProductsService._productsServiceInstance === null) {
      ProductsService._productsServiceInstance = new ProductsService();
    }
    return ProductsService._productsServiceInstance;
  }

  async create(body) {
    const newProduct = models.Product.create(body)
    return newProduct;
  }

  async findOne(id) {
    const product = models.Product.findByPk(id, {
      include: ['category']
    })
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async findAll(queryParams = null) {
    const data = await models.Product.findAll({
      include: ['category']
    })

    const {limit, offset} = queryParams;

    const count = data.length;
    const pages = Math.ceil(count/limit);
    const currentPage = Math.ceil(count%offset);
    const products = ( (limit && offset) && ( offset>0 )) ? data.slice((offset - 1) * limit , (limit * offset)) : data;

    const response = {
      data: products,
      meta: {
        total: count,
        showing: parseInt(limit) || count,
        page: currentPage || 1,
        pages: pages || 1,
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
    });
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);

    return {
      id,
      rta,
    };

  }

  async delete(id) {
    const product = await this.findOne(id)
    product.destroy()
    return true;
  }
}

module.exports = ProductsService;
