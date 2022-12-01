const boom = require('@hapi/boom');

const {models} = require('../../libs/sequelize')

class CategoryService {

  constructor(){}

  async create(data) {
    const newCategory = models.Category.create(data)
    return newCategory;
  }

  async find(queryParams) {
    const data = await models.Category.findAll()

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

  async findOne(id) {
    const category = models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);

    return {
      id,
      rta,
    };
  }

  async delete(id) {
    const category = await this.findOne(id);
    category.destroy()
    return true;
  }

}

module.exports = CategoryService;
