const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
const pool = require('../../libs/postgres.pool')

class ProductsService {
  constructor() {
    this.productList = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  static _productsServiceInstance = null;

  static async getInstance() {
    if (ProductsService._productsServiceInstance === null) {
      ProductsService._productsServiceInstance = new ProductsService();
    }
    return ProductsService._productsServiceInstance;
  }

  generate() {
    for (let index = 1; index <= 5; index++) {
      this.productList.push({
        id: index,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        img: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(body) {
    const last = Math.max(...this.productList.map(item => item.id))
    const newProduct = {
      id: last + 1 ,
      ...body
    }
    this.productList.push(newProduct)

    return {
      message: 'created',
      data: newProduct
    }
  }

  async findOne(id) {
    const product = this.productList.find((product) => product.id === parseInt(id))
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is Blocked');
    }
    return product;
  }

  async findAll(queryParams = null) {
    const query = 'SELECT * FROM task';
    const queryResult = await this.pool.query(query);

    const {limit, offset} = queryParams;

    const count = queryResult.rows.length;
    const pages = Math.ceil(count/limit);
    const currentPage = Math.ceil(count%offset);
    const products = ( (limit && offset) && ( offset>0 )) ? queryResult.rows.slice((offset - 1) * limit , (limit * offset)) : queryResult.rows;

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

  async update(id, body) {
    const index = this.productList.findIndex((item) => item.id === parseInt(id));

    if (index === -1){
      throw boom.notFound('Product not found');
    } else {
      const product = this.productList[index]
      this.productList[index] = {
        ...product,
        ...body
      }

      return {
        message: 'Updated',
        data: this.productList[index]
      }
    }
  }

  async delete(id) {
    const deletedProduct = this.productList.find((item) => item.id === parseInt(id))

    if (!deletedProduct) {
      throw boom.notFound('Product not found');
    } else {
      this.productList = this.productList.filter((item) => item.id !== parseInt(id));
      return {
        message: 'Deleted',
        data: deletedProduct
      };
    }

  }
}

module.exports = ProductsService;
