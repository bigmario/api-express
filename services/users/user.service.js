const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {models} = require('../../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const hashedPass = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
        name: data.name,
        lastName: data.lastName,
        Session: {
          email: data.email,
          password: hashedPass,
          role: data.role
        },
      },
      {
        include: ['Session']
      }
    );
    delete newUser.Session.dataValues.password
    return newUser;
  }

  async find(queryParams) {
    const rta = await models.User.findAll({
      include: ['Session']
    });
    const {limit, offset} = queryParams;

    for (const item of rta) {
      delete item.dataValues.Session.dataValues.password;
    }

    const count = rta.length;
    const pages = Math.ceil(count/limit);
    const currentPage = Math.ceil(count%offset);
    const products = ( (limit && offset) && ( offset>0 )) ? rta.slice((offset - 1) * limit , (limit * offset)) : rta;

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
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async findOneByEmail(email) {
    const user = await models.User.findOne({
      include: {
        model: models.Session,
        as: 'Session',
        where: {
          email
        }
      },


    });
    return user;
  }

  async update(id, changes) {
    const userUpdate = await this.findOne(id);
    const rta = await userUpdate.update({
        name: changes.name,
        lastName: changes.lastName,
        Session: {
          email: changes.email,
          role: changes.role
        },
      },
      {
        include: ['Session']
      }
    );

    return rta;
  }

  async delete(id) {
    const userDelete = await this.findOne(id);
    userDelete.destroy()
    return true;
  }
}

module.exports = UserService;
