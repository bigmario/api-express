const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.productList = [];
    this.generate();
  }

  generate() {
    for (let index = 1; index <= 5; index++) {
      this.productList.push({
        id: index,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        img: faker.image.imageUrl()
      });
    }
  }

  create(body) {
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

  findOne(id) {
    const product = this.productList.find((product) => product.id === parseInt(id))
    return product
  }

  findAll(queryParams = null) {
    const {limit, offset} = queryParams;

    const count = this.productList.length;
    const pages = Math.ceil(count/limit);
    const currentPage = Math.ceil(count%offset);
    const products = ( (limit && offset) && ( offset>0 )) ? this.productList.slice((offset - 1) * limit , (limit * offset)) : this.productList;

    return {
      data: products,
      meta: {
        total: count,
        showing: parseInt(limit) || count,
        page: currentPage || 1,
        pages: pages || 1,
      }
    }
  }

  update(id, body) {
    const index = this.productList.findIndex((item) => item.id === parseInt(id));

    if (index === -1){
      return false
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

  delete(id) {
    const deletedProduct = this.productList.find((item) => item.id === parseInt(id))

    if (!deletedProduct) {
      return false
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
