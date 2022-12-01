const boom = require('@hapi/boom');

const {models} = require('../../libs/sequelize')

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = models.Order.create(data)
    return newOrder;
  }

  async find(queryParams) {
    const data = await models.Order.findAll({
      include: ['customer']
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

    return response;
  }

  async addItem(data) {
    const newItem = models.OrderProduct.create(data)
    return newItem;
  }

  async findOne(id) {
    const order = models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'items',
        },
      ]
    })
    if (!order) {
      throw boom.notFound('Order not found')
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
